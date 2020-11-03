select p.title, p.content, p.post_id, u.name from post p
join users u on u.user_id = p.user_id
where post_id = $1