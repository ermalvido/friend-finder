import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { Button } from '@material-ui/core'

class Post extends Component {
    constructor(props){
        super(props)
        this.state = {
            newTitle: '',
            newContent: '',
            isEditing: false,
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
            this.setState({
                post: res.data,
                newTitle: res.data.title,
                newContent: res.data.content
            })
        })
        .catch(err => console.log(err))
    }

    handleToggle = () => {
        this.setState({
            isEditing: !this.state.isEditing
        })
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    updatePost = () => {
        axios.put(`/api/post/${this.state.post.post_id}`, {title: this.state.newTitle, content: this.state.newContent})
        .then(() => {
            this.props.history.push('/dashboard')
        })
        .catch(err => console.log(err))
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
                {this.state.isEditing ?(
                    <div>
                        <input placeholder='new_title' name='newTitle' onChange={(e) => this.handleInput(e)} value={this.state.newTitle}/>
                        <input placeholder='new_content' name='newContent' onChange={(e) => this.handleInput(e)} value={this.state.newContent}/>
                        <Button variant='outlined' size='small' onClick={this.updatePost}>Save</Button>
                        <Button variant='outlined' size='small' onClick={this.handleToggle}>Cancel</Button>
                    </div>
                ) : (
                    this.state.post.title
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
                )}
                <div className='edits'>
                    <Button variant='outlined' size='small' onClick={this.handleToggle}>Edit</Button>
                    <Button variant='outlined' size='small' onClick={this.delete} className='black_button'>Delete</Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Post);