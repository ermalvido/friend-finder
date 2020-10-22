insert into users(
    name,
    email,
    password,
    city,
    state
) values(
    ${name},
    ${email},
    ${hash},
    ${city},
    ${state}
)
returning user_id, name, email, city, state;