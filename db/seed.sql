create table if not exists users(
    user_id serial primary key,
    name varchar(50),
    email varchar(150),
    password text,
    profile_picture text,
    about text,
    likes text,
    dislikes text,
    city varchar(50),
    state varchar(2)
);

create table if not exists post(
    post_id serial primary key,
    content text,
    user_id int references users(user_id)
);

create table if not exists comments(
    comment_id serial primary key,
    comment_context text,
    post_id int references post(post_id),
    user_id int references users(user_id)
);