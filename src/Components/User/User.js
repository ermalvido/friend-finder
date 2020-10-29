import React, { Component } from 'react';
import { TextField, Typography } from '@material-ui/core';


class User extends Component {
    render() {
        return (
            <div className='user-box'>
                <Typography variant='h2'>Share with us</Typography>
                <TextField
                    id="standard-multiline-static"
                    label="About me"
                    multiline
                    rows={20}
                />
            </div>
        )
    }
}

export default User;