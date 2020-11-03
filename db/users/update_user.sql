update users
set
    city = $1,
    state = $2
where user_id = $3;

select user_id, name, email, city, state from users
where user_id = $3;