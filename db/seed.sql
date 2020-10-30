create table if not exists users(
    user_id serial primary key,
    name varchar(50),
    email varchar(150),
    password text,
    city varchar(50),
    state varchar(2)
);

create table if not exists post(
    post_id serial primary key,
    title varchar(50),
    content text,
    user_id int references users(user_id)
);

create table if not exists comments(
    comment_id serial primary key,
    comment_context text,
    post_id int references post(post_id),
    user_id int references users(user_id)
);

create table if not exists profile(
    user_id int references users(user_id),
    about text,
    likes text,
    dislikes text,
    profile_picture text
);