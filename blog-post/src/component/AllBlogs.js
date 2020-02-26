import React, {Fragment ,useEffect, useContext} from 'react';
import BlogContext from '../context/blog/blogContext';
import Spinner from './spinner.gif';
import AllBlogPost from './AllBlogPost';
import '../App.css';
import AuthContext from '../context/auth/authContext';        

const AllBlogs = () => {
    const authContext = useContext(AuthContext);

    const blogContext = useContext(BlogContext);

    const {allBlogs, getAllBlogs} = blogContext;

    useEffect(() => {
        authContext.loadUser();

        getAllBlogs();
        //eslint-disable-next-line
    }, []);
    
    if(allBlogs !== null && allBlogs.length === 0) {
        return <h4>No Blogs Uploaded</h4>
    }

    return (
        <Fragment>
            <div className='blog-div'>
            {allBlogs !== null 
                ? 
                    allBlogs.map((blog) => <AllBlogPost key={blog._id} blog={blog} />)
                : (
                    <div>
                        <h1 className='title'><img src={Spinner} alt='loading'/></h1>
                    </div>
                )}
            </div>
        </Fragment>
    )
}

export default AllBlogs;
