module.exports = {
    createPost: (req, res) => {
        const {title, content} = req.body,
            {user_id} = req.session.user,
            db = req.app.get('db');

        db.post.create_post(title, content, user_id)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err));
    },
    getAllPost: async(req, res) => {
        const db = req.app.get('db');

        db.post.get_posts()
        .then(posts => res.status(200).send(posts))
        .catch(err => res.status(500).send(err));
    },
    getUserPosts: async(req, res) => {
        const {id} = req.params,
            db = req.app.get('db');

        db.post.get_user_posts(id)
        .then(posts => res.status(200).send(posts))
        .catch(err => res.status(500).send(err));
    },
    deletePost: async(req, res) => {
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