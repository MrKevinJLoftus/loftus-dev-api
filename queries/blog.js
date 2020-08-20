module.exports = {
  FIND_POST_BY_ID: `select
      b.post_id as id, b.title, b.kebab_title as kebabTitle, b.body, b.tags, concat(u.first_name, ' ', u.last_name) as author
    from blog_posts b, users u
    where b.post_id = ?
      and b.created_by = u.user_id and b.deleted = 0`,
  GET_ALL_POSTS: `select
      b.post_id as id, b.title, b.kebab_title as kebabTitle, b.body,
      b.blurb, concat(u.first_name, ' ', u.last_name) as author, b.tags,
      b.created_date as createdDate
    from blog_posts b, users u
    where b.created_by = u.user_id
    and b.deleted = 0
    order by b.created_date`,
  CREATE_POST: `insert into
    blog_posts (title, kebab_title, body, blurb, tags, created_by, created_date)
    values (?, ?, ?, ?, ?, ?, now())`,
  DELETE_POST_BY_ID: `update blog_posts b
    set b.deleted = 1 where b.post_id = ?`
}