module.exports = {
  FIND_POST_BY_KEBAB_TITLE: `select
      b.title, b.kebab_title, b.body, b.blurb, b.tags, u.first_name || ' ' || u.last_name as author
    from blog_posts b, users u
    where b.kebab_title = ?
      and b.created_by = u.user_id`,
  GET_ALL_POST_BLURBS: `select
      b.title, b.kebab_title, b.blurb, u.first_name || ' ' || u.last_name as author
    from blog_posts b, users u
    where b.created_by = u.user_id
    order by b.created_date`,
  CREATE_POST: `insert into
    blog_posts (title, kebab_title, body, blurb, tags, created_by, created_date)
    values (?, ?, ?, ?, ?, ?, now())`
}