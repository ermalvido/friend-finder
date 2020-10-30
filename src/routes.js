import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Auth from './Components/Auth/Auth';
import Dash from './Components/Dash/Dash';
import Post from './Components/Post/Post';
import User from './Components/User/User';
import Form from './Components/Form/Form';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';

export default (
    <Switch>
        <Route exact path='/' component={Auth} />
        <Route path='/about' component={User} />
        <Route path='/dashboard' component={Dash} />
        <Route path='/post/:postId' component={Post} />
        <Route path='/new' component={Form} />
        <Route path='/forgotpassword' component={ForgotPassword} />
    </Switch>
)