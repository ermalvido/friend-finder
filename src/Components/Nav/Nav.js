import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../ducks/reducer';
import homeLogo from './home.png';
import newLogo from './NewLogo.png';
import logoutLogo from './logout.png';

function Nav(props) {
    if(props.location.pathname !== '/') {
        console.log('nav', props)
        return (
            <div className='nav_bar'>
                <div className='nav_profile_container'>
                    {/* <div className='nav_profile_pic'>UNFINISHED</div> */}
                    <p>{props.name}</p>
                </div>
                <div className='nav_links'>
                    <Link to='/dashboard'><img className='nav_img' src={homeLogo} alt='home' /></Link>
                    <Link to='/new'><img className='nav_img' src={newLogo} alt='new post' /></Link>
                </div>
                <Link to='/' onClick={props.logout}><img className='nav_img logout' src={logoutLogo} alt='logout' /></Link>
            </div>
        )
    } else {
        return null;
    }
}

function mapStateToProps(state) {
    return state;
}

export default withRouter(connect(mapStateToProps, { logoutUser })(Nav));