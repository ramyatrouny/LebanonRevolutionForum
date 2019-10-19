import { SUBMIT_POST, FAIL_POST_SUBMISSION } from '../actions/types';
import { GET_POSTS, FAIL_GET_POSTS } from '../actions/types';
const initialState = {
    status: '',
    posts: []
}

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SUBMIT_POST:
            return { ...state };
        case GET_POSTS:
            return { ...state, status: payload.status, posts: payload.posts };
        case FAIL_POST_SUBMISSION:
        case FAIL_GET_POSTS:
            return { ...state };
        default:
            return state;
    }
}