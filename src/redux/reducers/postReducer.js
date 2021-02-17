import {
    POST_APPROVE_A_POST_REQUEST,
    POST_APPROVE_A_POST_SUCCESS,
    POST_APPROVE_A_POST_FAILURE,

    //highlight posts list
    GET_HIGHLIGHT_POSTS_LIST_REQUEST,
    GET_HIGHLIGHT_POSTS_LIST_SUCCESS,
    GET_HIGHLIGHT_POSTS_LIST_FAILURE,

    //post
    GET_POST_BY_ID_REQUEST,
    GET_POST_BY_ID_SUCCESS,
    GET_POST_BY_ID_FAILURE,

    //post list
    GET_POSTS_LIST_SUCCESS,
    GET_POSTS_LIST_REQUEST,
    GET_POSTS_LIST_FAILURE,

    //my post
    GET_MY_POSTS_REQUEST,
    GET_MY_POSTS_SUCCESS,
    GET_MY_POSTS_FAILURE,

    //search post 
    GET_POST_SEARCH_RESULT_REQUEST,
    GET_POST_SEARCH_RESULT_SUCCESS,
    GET_POST_SEARCH_RESULT_FAILURE


} from '../constants.js'

const initialState = {
    currentPost: {
        isLoading: false, data: {}
    },
    //search post: use for search post and post list
    postsList: {
        isLoading: false,
        data: [],
        totalPages: 0
    },

    //my posts
    myPosts: {
        isLoading: false,
        data: [],
        totalPages: 0
    },

    //highlight posts list
    highlightPosts: {
        isLoading: false,
        isLoadDone: false,
        data: []
    },
    approvePost: {
        isLoadDone: false
    },
};

function PostReducer(state = initialState, action) {
    switch (action.type) {

        case GET_POST_BY_ID_REQUEST:
            return {
                ...state, currentPost: { isLoading: true }
            };
        case GET_POST_BY_ID_SUCCESS:
            {
                return { ...state, currentPost: { isLoading: false, data: action.payload } }
            }
        case GET_POST_BY_ID_FAILURE:
            {
                return { ...state, currentPost: { ...state.currentPost, isLoading: false } }
            }
        //get all not approved post

        case POST_APPROVE_A_POST_REQUEST:
            {
                return { ...state, approvePost: { isLoading: true } }
            }
        case POST_APPROVE_A_POST_SUCCESS:
            {
                return { ...state, approvePost: { isLoading: false, notification: { type: 'success', message: 'Duyệt thành công' } } }
            }
        case POST_APPROVE_A_POST_FAILURE:
            {
                return { ...state, approvePost: { isLoading: false, notification: { type: 'failure', message: 'Duyệt thất bại' } } }
            }

        //get highlight posts list

        case GET_HIGHLIGHT_POSTS_LIST_REQUEST:
            return {
                ...state, highlightPosts: { isLoading: true, isLoadDone: false }
            };
        case GET_HIGHLIGHT_POSTS_LIST_SUCCESS:
            {
                return { ...state, highlightPosts: { isLoading: false, isLoadDone: true, data: action.payload } }
            }
        case GET_HIGHLIGHT_POSTS_LIST_FAILURE:
            {
                return { ...state, highlightPosts: { isLoading: false, isLoadDone: true, data: [] } }
            }
        //get my post
        case GET_MY_POSTS_REQUEST:
            return {
                ...state, myPosts: { isLoading: true }
            };
        case GET_MY_POSTS_SUCCESS:
            {
                return { ...state, myPosts: { isLoading: false, data: action.payload.postSummaryWithStateDTOs, totalPage: action.payload.totalPages } }
            }
        case GET_MY_POSTS_FAILURE:
            {
                return { ...state, myPosts: { isLoading: false, data: [] } }
            }

        //get post search result
        case GET_POST_SEARCH_RESULT_REQUEST:
        case GET_POSTS_LIST_REQUEST:
            return {
                ...state, postsList: { isLoading: true }
            };
        case GET_POST_SEARCH_RESULT_SUCCESS:
        case GET_POSTS_LIST_SUCCESS:
            {
                return { ...state, postsList: { ...state.postsList, isLoading: false, data: action.payload.postSummaryDTOs, totalPages: action.payload.totalPages } }
            }
        case GET_POST_SEARCH_RESULT_FAILURE:
        case GET_POSTS_LIST_FAILURE:
            {
                return { ...state, postsList: { isLoading: false, data: [] } }
            }

        default:
            return state;
    }
}

export default PostReducer;
