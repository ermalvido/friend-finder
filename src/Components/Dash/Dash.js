import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import SearchLogo from './SearchLogo.png';
import { Button, Typography } from '@material-ui/core';


class Dash extends Component {
    constructor(props){
        super(props);
        this.state = {
            search: '',
            myPost: true,
            posts: [],
        }
        this.resetSearch = this.resetSearch.bind(this)
        this.getAllPosts = this.getAllPosts.bind(this)
    }

    componentDidMount = () => {
        this.getAllPosts()
    }

    getAllPosts = () => {
        axios.get('/api/posts').then(res => {
            this.setState({posts: res.data})
        })
    }

    handleChange = (e) => {
        this.setState({
            search: e.target.value
        })
    }

    handleCheckBoxChange = (val) => {
        this.setState({myPost: !this.state.myPost})
    }

    resetSearch = () => {
        let url = '/api/posts'
        if(this.state.myPost){
            url += "?user_posts=true&search="
        }
        axios.get(url).then(res => {
            this.setState({posts: res.data, search: " "})
        })
    }
    render() {
        console.log(this.props)
        const mapPosts = this.state.posts.map((e) => {
            return (
                <Link to={`/post/${e.post_id}`} key={e.post_id}>
                    <div className='content_box dash_post_box'>
                        <h3>{e.title}</h3>
                        <div className='author_box'>
                            <p>by {e.name}</p>
                            <p>{e.content}</p>
                        </div>
                    </div>
                </Link>
            )
        })
        return (
            <div className='Dash'>
                <div className='dash_filter'>
                    <div className='dash_search_box'>
                        <input onChange={(e) => this.handleChange(e)} className='dash_search_bar' placeholder='Search by Title' />
                            <img onClick={this.getAllPosts} className='dash_search_button' src={SearchLogo} alt='search' />
                            <Button size='small' onClick={this.resetSearch} className='black_button' id='dash_reset'>Reset</Button>
                    </div>
                    <div className='dash_check_box'>
                        <Typography>My Posts</Typography>
                        <input checked={this.state.myPost} onChange={() => this.handleCheckBoxChange()} type='checkbox' />
                    </div>
                </div>
                <section className='post-box'>{mapPosts}</section>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Dash);