import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

class Post extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: '',
            author_id: '',
            content: ''
        }
        this.delete = this.delete.bind(this)
    }
    
    render() {
        return (
            <div>Post</div>
        )
    }
}

export default Post;