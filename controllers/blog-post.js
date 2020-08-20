const queries = require('../queries/blog');
const dbconn = require('../utilities/database_connectors');

class BlogPost {
  // new posts come in as type { title, body, tags }
  // format title to generate the kebabTitle
  // grab first 250 characters of post to use as the blurb
  constructor(post, userId) {
    this.title = post.title || ``;
    this.kebabTitle = this.title.toLowerCase().replace(/\s/g, `-`);
    this.body = post.body.trim();
    this.blurb = this.body.substring(0, 1000);
    this.tags = post.tags;
    this.createdBy = userId;
  }
}

/**
 * Create new blog post and save it to the database.
 */
exports.createNewBlogPost = async (req, res) => {
  const newPost = new BlogPost(req.body.blogPost, req.userData.userId);
  const savedPost = await dbconn.executeMysqlQuery(queries.CREATE_POST, [
    newPost.title, newPost.kebabTitle, newPost.body,
    newPost.blurb, newPost.tags && newPost.tags.join(','), newPost.createdBy
  ]);
  res.status(200).json({
    message: `Blog post saved successfully.`
  });
}

/**
 * Fetch a specific blog post by its kebabTitle.
 */
exports.fetchPostByTitle = async (req, res) => {
  const foundPost = await dbconn.executeMysqlQuery(queries.FIND_POST_BY_KEBAB_TITLE, [req.params.title]);
  if (!foundPost || foundPost.length < 1) {
    res.status(404).json({
      message: `Error retrieving blog post.`
    });
  } else {
    splitPostTags(foundPost[0]);
    res.status(200).json({
      post: foundPost[0],
      message: `Successfully fetched blog post.`
    });
  }
}

/**
 * Fetch all blog posts' titles and blurbs.
 * TODO: Lazily paginate for future case when many posts exist and this becomes inefficient.
 */
exports.fetchAllPosts = async (req, res) => {
  const allBlogPosts = await dbconn.executeMysqlQuery(queries.GET_ALL_POST_BLURBS);
  if (!allBlogPosts) {
    res.status(404).json({
      message: `Error fetching blog posts.`
    });
  } else {
    for (let i = 0; i < allBlogPosts.length; i++) {
      splitPostTags(allBlogPosts[i]);
    }
    res.status(200).json({
      posts: allBlogPosts,
      message: `Successfully fetched blog posts.`
    });
  }
}

/**
 * Convert comma delimited string to array.
 * @param {*} blogPost 
 */
function splitPostTags(blogPost) {
  if (blogPost.tags) {
    blogPost.tags = blogPost.tags.split(',');
  }
}