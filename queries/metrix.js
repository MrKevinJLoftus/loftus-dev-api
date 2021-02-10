module.exports = {
  CREATE_GOAL: `insert into
  goals (name, desc, freq_days, created_date, created_by)
  values (?,?,?,now(),?)`,
  FETCH_ALL_GOALS: `select * from goals where user_id = ? order by created_date`,
  CREATE_GOAL_UPDATE: `insert into
  goal_updates (goal_id, created_date, update_desc, update_rating)
  values (?, now(), ?, ?)`,
  FETCH_ALL_UPDATES_BY_GOAL: `select * from goal_updates where goal_id = ? order by created_date desc`
};
