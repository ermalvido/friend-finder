import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUser } from '../../ducks/reducer';
import { Button, Typography } from '@material-ui/core';
import {Link} from 'react-router-dom';

class Auth extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            verPassword: '',
            city: '',
            state: '',
            registerView: false
        }
    }
    
    handleInput = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleToggle = () => {
        this.setState({registerView: !this.state.registerView})
    }

    handleRegister = () => {
        const {name, email, password, verPassword, city, state} = this.state;
        if(password && password === verPassword){
            axios.post('/api/register', {name, email, password, city, state})
            .then(res => {
                this.props.getUser(res.data);
                this.props.history.push('/');
                this.setState({registerView: false, email: '', password: '', verPassword: ''})
            })
            .catch(err => console.log(err));
        } else {
            alert("Passwords don't match")
        }
    }

    handleLogin = () => {
        const {email, password} = this.state;

        axios.post('/api/login', {email, password})
        .then(res => {
            console.log(res.data)
            this.props.getUser(res.data);
            this.props.history.push('/dashboard');
        })
        .catch(err => console.log(err));
    }

    render() {
        return (
            <div className='auth-container'>
                <section className='authentication-info'>
                    <Typography align='center' variant='h2' color='initial'>Friend Finder</Typography>
                    {this.state.registerView
                    ? (<>
                        <Typography align='center' variant='h5' color='initial'>Register Below</Typography>
                        <input
                            value={this.state.name}
                            name='name'
                            placeholder='Name'
                            onChange={(e) => this.handleInput(e)}/>
                        </>)
                    : <Typography align='center' variant='h5' color='initial'>Login Below</Typography>}
                    <input
                        value={this.state.email}
                        name='email'
                        placeholder='Email'
                        onChange={(e) => this.handleInput(e)}/>
                    <input
                        type='password'
                        value={this.state.password}
                        name='password'
                        placeholder='Password'
                        onChange={(e) => this.handleInput(e)}/>
                    {this.state.registerView
                    ? (<>
                        <input
                            type='password'
                            value={this.state.verPassword}
                            name='verPassword'
                            placeholder='Verify Password'
                            onChange={(e) => this.handleInput(e)}/>
                        <input
                            value={this.state.city}
                            name='city'
                            placeholder='City'
                            onChange={(e) => this.handleInput(e)}/>
                        <input
                            value={this.state.state}
                            name='state'
                            placeholder='State'
                            onChange={(e) => this.handleInput(e)}/>
                        <Button size='small' onClick={this.handleRegister} className='register-button' variant='outlined' color='initial'>Register</Button>
                        <Typography align='center'>Already a member? <span onClick={this.handleToggle}>Login Here</span></Typography>
                        </>)
                    : (<>
                        <Button size='small' onClick={this.handleLogin} id='login-button' variant='outlined' color='initial'>Login</Button>
                        <Typography align='center'>Need to create an account? <Button onClick={this.handleToggle}>Register Here</Button></Typography>
                        </>)}
                        <Link to='/forgotPassword'>
                            <Button size='small'>Forgot your password?</Button>
                        </Link>
                </section>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {getUser})(Auth);