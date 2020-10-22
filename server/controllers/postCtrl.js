module.exports = {
    createPost: (req, res) => {
        const {id, content} = req.body,
            db = req.app.get('db');

        db.post.create_post(id, content)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err));
    },
    getUserPosts: (req, res) => {
        const {id} = req.params,
            db = req.app.get('db');

        db.post.get_user_posts(id)
        .then(posts => res.status(200).send(posts))
        .catch(err => res.status(500).send(err));
    },
    deletePost: (req, res) => {
        const {id} = req.params,
            db = req.app.get('db');

        db.post.delete_post(id)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err));
    },
    updateUser: (req, res) => {
        const   {id} = req.params,
                {name, city, state} = req.body,
                db = req.app.get('db');

        db.users.update_user(name, city, state, id)
        .then(user => res.status(200).send(user))
        .catch(err => console.log(err));
    }
}