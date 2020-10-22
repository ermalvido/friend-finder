select p.post_id, p.content from post p
join users mu on p.user_id = mu.user_id
where mu.user_id = $1;