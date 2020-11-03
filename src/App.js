import React from 'react';
import Nav from './Components/Nav/Nav';
import routes from './routes';
import {withRouter} from 'react-router-dom';
import './App.css';

function App(props) {
  return (
    <div className='App'>
      {props.location.pathname !== '/' && props.location.pathname !== '/forgotPassword'
        ? <Nav />
        : null}
      {routes}
    </div>
  );
}

export default withRouter(App);