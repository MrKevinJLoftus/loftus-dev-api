module.exports = {
  FIND_CHORE_BY_ID: `select *
    from chores where id = ?`,
  GET_ALL_CHORES: `select *
    from chores
    order by description`,
  CREATE_CHORE: `insert into
    chores (description)
    values (?)`,
  DELETE_CHORE_BY_ID: `delete from chores
    where chore_id = ?`,
  UPDATE_CHORE_BY_ID: `update chores
    set
      description = ?
    where chore_id = ?`,
  GET_ALL_TASKS: `select j.id, c.description, j.date_completed, p.name, j.notes
    from chore_jobs j
    inner join chores c
      on j.chore_id = c.id
    inner join chore_people p
      on j.person_completed = p.id
    order by date_completed desc`,
  LOG_NEW_TASK: `insert into chore_jobs
    (chore_id, date_completed, person_completed, notes)
    values (?, now(), ?, ?)`,
  GET_ALL_PEOPLE: `select * from chore_people order by name`,
  CREATE_PERSON: `insert into chore_people (name) values (?)`
}