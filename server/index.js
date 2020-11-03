require('dotenv').config();
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      authCtrl = require('./controllers/authCtrl'),
      postCtrl = require('./controllers/postCtrl'),
      nmCtrl = require('./controllers/nmCtrl'),
      path = require('path'),
    { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env,
      port = SERVER_PORT,
      app = express();

app.use(express.json());

app.use(express.static(__dirname + '/../build'));

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 365}
}));

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db);
    console.log('db connected')
}).catch(err => console.log(err));

// Endpoints
app.post('/api/register', authCtrl.register);
app.post('/api/login', authCtrl.login);
app.get('/api/logout', authCtrl.logout);

app.post('/api/posts/create', postCtrl.createPost);
app.get('/api/posts', postCtrl.getAllPost);
app.get('/api/post/:id', postCtrl.getSinglePost);
app.put('/api/post/:id', postCtrl.updatePost);
app.delete('/api/post/:id', postCtrl.deletePost);

app.put('/api/user/:id', postCtrl.updateUser);

app.post('/api/email', nmCtrl.email);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(port, () => console.log(`Server running on ${port}`));