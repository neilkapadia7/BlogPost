import React, {useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import BlogContext from '../context/blog/blogContext';
import '../App.css';
import AlertContext from '../context/alert/alertContext'



const BlogPost = props => {
    const blogContext = useContext(BlogContext);
    const { setCurrent, current, deleteBlog} = blogContext;
    const alertContext = useContext(AlertContext);
    const {setAlert} = alertContext;

    const {_id, title, body, author} = props.blog;
    
    const currentt = null;

    useEffect(() => {
        if(currentt) {
            props.history.push('/')
        }       
        
        //eslint-disable-next-line
    }, [current]);

    const Click = () => {
        setCurrent(props.blog);      
    }
    const Delete = () => {
        deleteBlog(_id);
        setAlert('Deleted Blog Successsfully!', 'success');
    }

    return (
        <div className='blog'>
            <div className='blog-content'>
                <p className='blog-title'>{title}</p>
                <p className='blog-body'>{body}</p>
                <Link to={`/user/${_id}`}  className='blog-user'>{author}</Link>
                <div className='blog-up-del'>
                    <Link to='/update' className='blog-user-update' onClick={Click}>Edit</Link>
                    <p onClick={Delete} className='blog-user-delete'>Delete</p>
                </div>
            </div>
        </div>
    )
}

export default BlogPost
