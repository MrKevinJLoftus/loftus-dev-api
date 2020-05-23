const BlogPost = require('../models/blog-post');
const UserController = require('./user');

class BlogPostDoc {
  // new posts come in as type { title, body, tags }
  // format title to generate the kebabTitle
  // grab first 250 characters of post to use as the blurb
  constructor(post, userId) {
    this.title = post.title || ``;
    this.kebabTitle = this.title.toLowerCase().replace(` `, `-`);
    this.body = post.body.trim();
    this.blurb = this.body.substring(0, 250);
    this.tags = post.tags;
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
    // attach author to post with a query
    const author = await UserController.fetchUserById(foundPost.createdBy);
    foundPost.author = `${author.firstName} ${author.lastName}`;
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
    // fetch names of users who wrote these posts
    const postAuthors = await UserController.fetchUsersById(allBlogPosts.map(p => p.createdBy));
    const formattedBlogPosts = allBlogPosts.map(p => {
      const postAuthor = postAuthors.find(a => a.id === p.createdBy);
      return {
        ...p,
        author: `${postAuthor.firstName} ${postAuthor.lastName}`
      }
    });
    res.status(200).json({
      posts: formattedBlogPosts,
      message: `Successfully fetched blog posts.`
    });
  }
}