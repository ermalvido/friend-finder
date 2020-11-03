import React, {useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

function ForgotPassword(props) {
    const [state, sState] = useState({
        email: '',
    })
    const handleInput = (event) => {
        sState({...state, [event.target.name]: event.target.value})
    }
    const sendEmail = async(e) => {
        e.preventDefault();
        const {email} = state;
        await axios
            .post('/api/email', {email})
            .then(() => {
                alert(`Reset password email has been sent.`)
                sState({email: ''})
                props.history.push('/')
            })
            .catch(err => {
                alert('Email is not on file.')
                console.log(err)
            })
    }
    return (
        <div>
            <header className='fpw-header'>
                <Link className='fpw-link' to='/'>&#10094; BACK</Link>
            </header>
            <form className='fpw-box'>
                <h1>Forgot Password</h1>
                <span>Enter the email associated with your account and we'll be sure to send an email to reset your password.</span>
                <input 
                    className='fpw-input'
                    value={state.email}
                    name='email'
                    placeholder='Email Address'
                    onChange={(e) => handleInput(e)}/>
                <button
                    className={state.email
                        ?'fpw-button change':'fpw-button'}
                    onClick={sendEmail}
                        >SEND EMAIL</button>
            </form>
        </div>
    )
}

export default ForgotPassword;