import React, {useReducer} from 'react';
import BlogReducer from './blogReducer';
import BlogContext from './blogContext';
import axios from 'axios';
import {
    ADD_BLOG,
    GET_BLOGS,
    GET_ALL_BLOGS,
    GET_USER,
    REMOVE_USER,
    GET_USERBLOG,
    BLOG_ERROR,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_BLOG,
    DELETE_BLOG
} from '../types';

const BlogState = props => {

    const initialState = {
        blogs: null,
        allBlogs: null,
        userBlogs: null,
        current: null,
        error: null,
        user: null
    }

    const [state, dispatch] =useReducer(BlogReducer, initialState);
    
    // Add a blog
    const addBlog = async blog => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/blogs', blog, config);
            dispatch({type: ADD_BLOG, payload: res.data})
        } 
        catch (err) {
            console.log(err)
        }
        
        dispatch({ type: ADD_BLOG, payload: blog })
    }

    //Get User Posts 
    const getBlogs = async () => {
        try {
            const res = await axios.get('api/blogs');
            dispatch({ type: GET_BLOGS, payload: res.data});
        }
        catch(err) {
            console.log(err);
        }
    }

    // Get All Blogs
    const getAllBlogs = async () => {
        try {
            const res = await axios.get('api/blogs/all');
            // console.log(res.data)
            dispatch({ type: GET_ALL_BLOGS, payload: res.data});
        } catch (err) {
            console.log(err);   
        }
    }

    

    // Get single User
    const getUser = async id => {
        try {
            const res = await axios.get(`/api/auth/user/${id}`);
            dispatch({ type: GET_USER, payload: res.data });
        } catch (err) {
            console.log(err);   
        }
    }

    // Get a user's Blogs
    const getUserBlog = async id => {
        try {
            const res = await axios.get(`/api/blogs/user/${id}`);
            dispatch({ type: GET_USERBLOG, payload: res.data });
        } catch (err) {
            console.log(err);   
        }
    }

    // Remove user from state
    const removeUser = () => {
        dispatch({type: REMOVE_USER});
    }

    // Set Current
    const setCurrent = blog => {
        dispatch({ type: SET_CURRENT, payload: blog });
    }

    // Update Blog
    const updateBlog = async blog => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.put(`/api/blogs/${blog._id}`, blog, config);
            dispatch({ type: UPDATE_BLOG, payload: res.data });
        } 
        catch (err) {
            dispatch({ 
                type: BLOG_ERROR,
                payload: err.response.msg
            });
        }
    }
    // Delete Blog
    const deleteBlog = async id => {
        try {
            await axios.delete(`/api/blogs/${id}`);
            dispatch({ type: DELETE_BLOG, payload: id });
        } 
        catch (err) {
            console.log(err);
        }
    }

    // Clear Current
    const clearCurrent = () => {
        dispatch({type: CLEAR_CURRENT});
    }

    return(
        <BlogContext.Provider value={{
            blogs: state.blogs,
            allBlogs: state.allBlogs,
            userBlogs: state.userBlogs,
            error: state.error,
            user: state.user,
            current: state.current,
            getBlogs,
            getAllBlogs,
            getUser,
            removeUser,
            getUserBlog,
            setCurrent,
            clearCurrent,
            addBlog,
            updateBlog,
            deleteBlog
        }}>
            {props.children}
        </BlogContext.Provider>
    )
}

export default BlogState
