module.exports = {
  FIND_POST_BY_KEBAB_TITLE: `select
      b.title, b.kebab_title as kebabTitle, b.body, b.tags, concat(u.first_name, ' ', u.last_name) as author
    from blog_posts b, users u
    where b.kebab_title = ?
      and b.created_by = u.user_id and b.deleted = 0`,
  GET_ALL_POSTS: `select
      b.title, b.kebab_title as kebabTitle, b.body,
      b.blurb, concat(u.first_name, ' ', u.last_name) as author, b.tags,
      b.created_date as createdDate
    from blog_posts b, users u
    where b.created_by = u.user_id
    and b.deleted = 0
    order by b.created_date`,
  CREATE_POST: `insert into
    blog_posts (title, kebab_title, body, blurb, tags, created_by, created_date)
    values (?, ?, ?, ?, ?, ?, now())`,
  DELETE_POST_BY_KEBAB_TITLE: `update blog_posts b
    set b.deleted = 1 where b.kebab_title = ?`
}