import React, {useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import BlogContext from '../context/blog/blogContext';
import '../App.css';



const AllBlogPost = props => {
    const blogContext = useContext(BlogContext);
    const {removeUser} = blogContext;
    
    const {title, body, author, user} = props.blog;
    

    useEffect(() => {
        removeUser();
           
        //eslint-disable-next-line
    }, []);  

    return (
        <div className='blog'>
            <div className='blog-content'>
                <p className='blog-title'>{title}</p>
                <p className='blog-body'>{body}</p>
                <Link to={`/user/${user}`}  className='blog-user'>{author}</Link>
            </div>
        </div>
    )
}

export default AllBlogPost;
