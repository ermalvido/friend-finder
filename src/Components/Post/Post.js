import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { Button } from '@material-ui/core'

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

    componentDidMount() {
        axios.get('/api/post/${this.props.match.params.id}').then(res => {
            this.setState({...res.data[0]})
        })
    }

    delete() {
        axios.delete('/api/post/${this.props.match.params.id}').then(res => {
            this.props.history.push('/dashboard')
        })
    }
    render() {
        return (
            <div className='post_content_box'>
                {this.state.title
                    ?
                    <div>
                        <div className='post_header'>
                            <h2 className='title'>{this.state.title}</h2>
                            <div className='author_box'>
                                <p>by {this.state.name}</p>
                            </div>
                        </div>
                        <div className='post_content'>
                            <p>{this.state.content}</p>
                        </div>
                    </div>
                    :
                    <div className='oops_box'>
                        <h2 className='title'>Oops!</h2>
                        <p>Looks like this post doesn't exist anymore</p>
                    </div>
                }
                <div className='delete'>
                    <Button variant='outlined' size='small' onClick={this.delete} className='black_button'>Delete</Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Post);