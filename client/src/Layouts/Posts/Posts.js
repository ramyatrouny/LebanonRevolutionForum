import React, { Component } from 'react';
import './Posts.css';

import { connect } from 'react-redux';
import { getCurrentPosts } from '../../actions/post';
import moment from 'moment';

class Posts extends Component {
    componentDidMount() {
        this.props.getCurrentPosts();

        console.log(this.props);
    }


    render() {
        return (
            <div className="container posts-list">
                <div className="postcontainer">
                    {
                        this.props.userPosts && this.props.userPosts.map(element => (
                            
                            <div className="postsBox" key={element._id}>
                                <p>{element.post}</p>
                                <p className="creationDate">{moment(element.createdAt).format('YYYY-MM-DD hh:mm A')}</p>
                            </div>
                        ))
                    }

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    userPosts: state.post.posts
})

export default connect(mapStateToProps, { getCurrentPosts })(Posts);