import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import SearchLogo from './SearchLogo.png';


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

    resetSearch() {
        let url = '/api/posts'
        if(this.state.myPost){
            url += "?user_posts=true&search="
        }
        axios.get(url).then(res => {
            this.setState({posts: res.data, search: " "})
        })
    }
    render() {
        const mapPosts = this.state.posts.map((e) => {
            return (
                <Link to={`/Post/${e.id}`} key={e.id}>
                    <div className='content_box dash_post_box'>
                        <h3>{e.title}</h3>
                        <div className='author_box'>
                            <p>by {e.name}</p>
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
                            <button onClick={this.resetSearch} className='black_button' id='dash_reset'>Reset</button>
                    </div>
                    <div className='dash_check_box'>
                        <p>My Posts</p>
                        <input checked={this.state.myPost} onChange={() => this.setState({myPost: !this.state.myPost}, this.getAllPosts)} type='checkbox' />
                    </div>
                </div>
                <section className='post-box'>{mapPosts}</section>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userId: state.userId
    }
}

export default connect(mapStateToProps)(Dash);