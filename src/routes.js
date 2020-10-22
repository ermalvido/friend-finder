import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Auth from './Components/Auth/Auth';
import Register from './Components/Register/Register';
import Dash from './Components/Dash/Dash';
import Post from './Components/Post/Post';
import User from './Components/User/User';
import Form from './Components/Form/Form';

export default (
    <Switch>
        <Route exact path='/' component={Auth} />
        <Route path='/register' component={Register} />
        <Route path='/aboutme' component={User} />
        <Route path='/dashboard' component={Dash} />
        <Route path='/post/:postid' component={Post} />
        <Route path='/new' component={Form} />
    </Switch>
)