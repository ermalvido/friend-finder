import React, { Component } from 'react';
import store from '../../ducks/store';
import axios from 'axios';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';

class Form extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: '',
            content: '',
            newPost: { }
        }
    }

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = () => {
        const {title, content} = this.state;

        axios
        .post('/api/posts/create', {title, content})
        .then(() => {
            this.props.history.push('/dashboard')
        })
        .catch(err => console.log(err));
    }

    // createPost = () => {
    //     const {title, content} = this.props

    //     axios
    //     .post('/api/post', {title, content})
    //     .then(() => {
    //         this.setState({newPost: {title, content}});
    //     })
    //     .catch(err => console.log(err));
    // }

    render() {
        return (
            <div className='Form'>
                <div className='form_content_box'>
                <Typography align='center' variant='h2' color='initial'>New Post</Typography>
                    <input onChange={(e) => this.handleInput(e)} className='form-input' type='text' name='title' placeholder='Post Title' />
                    <textarea onChange={(e) => this.handleInput(e)} className='form-text' type='text' name='content' placeholder='Share with us' rows='40' cols='40' />
                    <Link to='/dashboard'>
                        <Button size='small' onClick={this.handleSubmit} className='form-post-button'>Post</Button>
                    </Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Form);