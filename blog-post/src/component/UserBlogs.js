import React, {useEffect, useContext} from 'react';
import BlogContext from '../context/blog/blogContext';
import Spinner from './spinner.gif';
import BlogPost from './AllBlogPost';
import '../App.css';
import AuthContext from '../context/auth/authContext';


const UserBlogs = (id) => {
    const authContext = useContext(AuthContext);
    
    const blogContext = useContext(BlogContext);
    const {getUserBlog, userBlogs} = blogContext;

    useEffect(() => {
        authContext.loadUser();
        
        getUserBlog(id.match.params.id);
        // eslint-disable-next-line
    }, []);

    return (
        <div className='blog-div'>
            {userBlogs !== null 
                ? 
                userBlogs.map((blog) => <BlogPost key={blog.id} blog={blog} />)
                : (
                    <div>
                        <h1 className='title'><img src={Spinner} alt='loading'/></h1>
                    </div>
                )}
            </div>
    )
}

export default UserBlogs
