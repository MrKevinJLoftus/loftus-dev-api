const BlogPost = require('../models/blog-post');
const User = require('../models/user');

class BlogPostDoc {
  // new posts come in as type { title, body }
  // format title to generate the kebabTitle
  // grab first 250 characters of post to use as the blurb
  constructor(post, userId) {
    this.title = post.title || ``;
    this.kebabTitle = this.title.toLowerCase().replace(` `, `-`);
    this.body = post.body.trim();
    this.blurb = this.body.substring(0, 250);
    this.createdBy = userId;
  }
}

/**
 * Create new blog post and save it to the database.
 */
exports.createNewBlogPost = async (req, res) => {
  const newPost = new BlogPostDoc(req.body.blogPost);
  const savedPost = await BlogPost.create(newPost, req.userId);
  res.status(200).json({
    message: `Blog post saved successfully.`
  });
}

/**
 * Fetch a specific blog post by its kebabTitle.
 */
exports.fetchPostByTitle = async (req, res) => {
  const foundPost = await BlogPost.findOne({ kebabTitle: req.params.title });
  if (!foundPost) {
    res.status(404).json({
      message: `Error retrieving blog post.`
    });
  } else {
    res.status(200).json({
      post: foundPost,
      message: `Successfully fetched blog post.`
    });
  }
}

/**
 * Fetch all blog posts' titles and blurbs.
 * TODO: Lazily paginate for future case when many posts exist and this becomes inefficient.
 */
exports.fetchAllPosts = async (req, res) => {
  const allBlogPosts = await BlogPost.find({}, 'title kebabTitle blurb');
  if (!allBlogPosts) {
    res.status(404).json({
      message: `Error fetching blog posts.`
    });
  } else {
    res.status(200).json({
      posts: allBlogPosts,
      message: `Successfully fetched blog posts.`
    });
  }
}