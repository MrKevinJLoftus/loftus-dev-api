module.exports = {
  CREATE_GOAL: `insert into
  goals (name, description, freq_days, created_date, created_by)
  values (?,?,?,now(),?)`,
  FETCH_ALL_GOALS: `select
    g.goal_id as goalId,
    g.name,
    g.description,
    g.freq_days as frequency,
    g.created_date as createdDate,
    u.update_id as updateId,
    u.update_desc as updateDescription,
    u.update_rating as updateRating,
    u.created_date as updateCreatedDate
  from goals g
  left join goal_updates u on g.goal_id = u.goal_id
  where g.created_by = ?
  order by g.created_date, u.created_date desc limit 10`,
  CREATE_GOAL_UPDATE: `insert into
  goal_updates (goal_id, created_date, update_desc, update_rating)
  values (?, now(), ?, ?)`
};
