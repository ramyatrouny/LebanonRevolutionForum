import axios from 'axios';
import { SUBMIT_POST, FAIL_POST_SUBMISSION } from '../actions/types';
import { GET_POSTS, FAIL_GET_POSTS } from '../actions/types';

// GET CURRENT USERS PROFILE
export const getCurrentPosts = () => async dispatch => {
    try {
        const res = await axios.get('/posts/latest');

        dispatch({
            type: GET_POSTS,
            payload: res.data
        });


    } catch (err) {
        dispatch({
            type: FAIL_GET_POSTS,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const submitPost = (post) => async dispatch => {
    try {
        const body = new URLSearchParams();
        body.set('post', post);

        const res = await axios.post('/posts/AddPost', body);
        
        
        dispatch({
            type: SUBMIT_POST,
            payload: res.newPost
        });
        
        dispatch(getCurrentPosts());

        

    } catch (err) {
        dispatch({
            type: FAIL_POST_SUBMISSION
        })
    }
}