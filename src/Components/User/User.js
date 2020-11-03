import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, TextField, Typography } from '@material-ui/core';
import { loginUser } from '../../ducks/reducer';

class User extends Component {
    // constructor(props)

    // updateUser = (newCity, newState, id) => {
    //     let body = {
    //         city: newCity,
    //         state: newState
    //     };
    //     axios.put(`/api/user/${id}`, body)
    //     .then(res => {
    //         this.props.loginUser(res.data)
    //     })
    //     .catch(err => console.log(err));
    // }

    render() {
        return (
            <div className='user-box'>
                <img className='profile_pic' />
                <Typography variant='h2'>Share with us</Typography>
                <TextField
                    id="standard-multiline-static"
                    label="About me"
                    multiline
                    rows={20}
                /><Button>Submit</Button>
            </div>
        )
    }
}

export default connect(null, {loginUser})(User);