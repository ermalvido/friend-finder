update users
set
    name = $1,
    city = $2,
    state = $3
where user_id = $4;

select user_id, name, email, city, state from users
where user_id = $4;