import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { Button } from '@material-ui/core'

class Post extends Component {
    constructor(props){
        super(props)
        this.state = {
            post: {}
        }
    }

    componentDidMount() {
        const {postId} = this.props.match.params;
        console.log(postId)
        axios
        .get(`/api/post/${postId}`)
        .then(res => {
            console.log(res.data)
            this.setState({post: res.data})
        })
        .catch(err => console.log(err))
    }

    updatePost = () => {

    }

    delete = () => {
        axios.delete(`/api/post/${this.state.post.post_id}`)
        .then(() => {
            this.props.history.push('/dashboard')
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <div className='post_content_box'>
                {this.state.post.title
                    ?
                    <div>
                        <div className='post_header'>
                            <h2 className='title'>{this.state.post.title}</h2>
                        </div>
                        <div className='post_content'>
                            <p>{this.state.post.content}</p>
                        </div>
                        <div className='author_box'>
                            <p>by {this.state.post.name}</p>
                        </div>
                    </div>
                    :
                    <div className='oops_box'>
                        <h2 className='title'>Oops!</h2>
                        <p>Looks like this post doesn't exist anymore</p>
                    </div>
                }
                <div className='edits'>
                    <Button variant='outlined' size='small'>Edit</Button>
                    <Button variant='outlined' size='small'>Save</Button>
                    <Button variant='outlined' size='small' onClick={this.delete} className='black_button'>Delete</Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Post);