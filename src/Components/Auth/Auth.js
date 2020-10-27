import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUser } from '../../ducks/reducer';
import { Button, Typography } from '@material-ui/core';

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
    
    componentDidMount(){
        if(this.props.user.email){
            this.props.history.push('/');
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
            this.props.getUser(res.data);
            this.props.history.push('/dashboard');
        })
        .catch(err => console.log(err));
    }

    render() {
        return (
            <div className='auth-container'>
                <section className='authentication-info'>
                    <Typography variant='h1' color='secondary'>Friend Finder</Typography>
                    {this.state.registerView
                    ? (<>
                        <Typography variant='h5' color='initial'>Register Below</Typography>
                        <input
                            value={this.state.name}
                            name='name'
                            placeholder='Name'
                            onChange={(e) => this.handleInput(e)}/>
                        </>)
                    : <Typography variant='h5' color='initial'>Login Below</Typography>}
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
                        <Button onClick={this.handleRegister} variant='outlined' color='secondary'>Register</Button>
                        <p>Already a member? <span onClick={this.handleToggle}>Login Here</span></p>
                        </>)
                    : (<>
                        <Button onClick={this.handleLogin} variant='outlined' color='secondary'>Login</Button>
                        <p>Need to create an account? <span onClick={this.handleToggle}>Register Here</span></p>
                        </>)}
                </section>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {getUser})(Auth);