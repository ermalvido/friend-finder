import React, { Component } from 'react';
import store from '../../ducks/store';
import axios from 'axios';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class Form extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: '',
            content: '',
            newPost: { }
        }
    }

    handleInput(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = () => {
        const newPost = this.state
        console.log('sending new post', newPost);
    }

    createPost = () => {
        const {title, content} = this.props

        axios
        .post('/api/post', {title, content})
        .then(() => {
            this.setState({newPost: {title, content}});
        })
        .catch(err => console.log(err));
    }

    render() {
        return (
            <div className='Form'>
                <div className='form_content_box'>
                    <h1 className='title'>New Post</h1>
                    <input onChange={(e) => this.handleInput(e)} className='form-input' type='text' name='title' placeholder='Enter Post Title' />
                    <textarea onChange={(e) => this.handleInput(e)} className='form-text' type='text' name='content' placeholder='Share with us' rows='40' cols='50' />
                    <Link to='/dashboard'>
                        <button onClick={this.createPost} className='form-post-button'>Post</button>
                    </Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Form);