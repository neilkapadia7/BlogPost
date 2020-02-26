import {
    ADD_BLOG,
    GET_BLOGS,
    GET_ALL_BLOGS,
    GET_USERS,
    GET_USER,
    REMOVE_USER,
    GET_USERBLOG,
    CLEAR_BLOGS,
    BLOG_ERROR,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_BLOG,
    DELETE_BLOG
} from '../types';

export default (state, action) => {
    switch (action.type){
        case ADD_BLOG: 
            return {
                ...state,
                blogs: [action.payload],
                loading: false
            }
        case GET_BLOGS:
            return {
                ...state,
                blogs: action.payload
            }
        case GET_ALL_BLOGS: 
            return {
                ...state,
                allBlogs : action.payload
            }
        case UPDATE_BLOG:
            return {
                ...state,
                blogs: state.blogs.map(blog => 
                    blog._id === action.payload._id ? action.payload : blog
                ),
                loading: false
            }
        case DELETE_BLOG:
            return {
                ...state,
                blogs: state.blogs.filter(blog => blog._id !== action.payload),
                loading: false
            }
        case GET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case GET_USER :
            return {
                ...state,
                user: action.payload
            }
        case GET_USERBLOG :
            return{
                ...state,
                userBlogs: action.payload
            }
        case REMOVE_USER :
            return {
                ...state,
                user: null
            }
        case CLEAR_BLOGS:
            return {
                ...state,
                blogs: null
            }
        case BLOG_ERROR: 
            return {
                ...state,
                error: action.payload
            }
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            }
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            }
        default:
            return state;
    }
}

