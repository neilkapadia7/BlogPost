import React, {Fragment ,useEffect, useContext} from 'react';
import BlogContext from '../context/blog/blogContext';
import Spinner from './spinner.gif';
import BlogPost from './BlogPost';
import '../App.css';
import AuthContext from '../context/auth/authContext';        

const Blogs = () => {
    const authContext = useContext(AuthContext);

    const blogContext = useContext(BlogContext);

    const {blogs, getBlogs} = blogContext;

    useEffect(() => {
        authContext.loadUser();

        getBlogs();
        //eslint-disable-next-line
    }, []);
    
    if(blogs !== null && blogs.length === 0) {
        return <h4>Please Add a Blog</h4>
    }

    return (
        <Fragment>
            <div className='blog-div'>
            {blogs !== null 
                ? 
                    blogs.map((blog) => <BlogPost key={blog._id} blog={blog} />)
                : (
                    <div>
                        <h1 className='title'><img src={Spinner} alt='loading'/></h1>
                    </div>
                )}
            </div>
        </Fragment>
    )
}

export default Blogs;
