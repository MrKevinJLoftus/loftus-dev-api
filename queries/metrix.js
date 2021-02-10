module.exports = {
  CREATE_GOAL: `insert into
  goals (name, desc, freq_days, created_date, created_by)
  values (?,?,?,now(),?)`,
  FETCH_ALL_GOALS: `select
    g.goal_id as goalId,
    g.name,
    g.desc,
    g.freq_days as frequency,
    g.created_date as createdDate,
    u.update_id as updateId,
    u.update_desc as updateDescription,
    u.update_rating as updateRating,
    u.created_date as updateCreatedDate
  from goals g, goal_updates u
  where g.goal_id = u.goal_id and g.user_id = ?
  order by g.created_date, u.created_date desc`,
  CREATE_GOAL_UPDATE: `insert into
  goal_updates (goal_id, created_date, update_desc, update_rating)
  values (?, now(), ?, ?)`
};
