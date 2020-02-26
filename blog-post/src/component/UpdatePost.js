import React, {useEffect, useContext, useState, Fragment} from 'react';
import BlogContext from '../context/blog/blogContext';
import '../App.css';
import AuthContext from '../context/auth/authContext';
import AlertContext from '../context/alert/alertContext'

const Home = props => {
    const authContext = useContext(AuthContext);
    const blogContext = useContext(BlogContext);
    const alertContext = useContext(AlertContext)
    
    const {updateBlog, current, clearCurrent} = blogContext;
    const {loadUser} = authContext;
    const {setAlert} = alertContext;

    useEffect(() => {
        loadUser();

        if(current !== null) {
            setBlog(current);
        }
        else{
            setBlog({
                title: '',
                body: '',
                author: ''
            });
        }
        
        return () => {
            clearCurrent();
        }

        //eslint-disable-next-line
    }, [current]);

    
    const [blog, setBlog] =useState({
        title: '',
        body: '',
        author: ''
    });
    
    const {title, body} = blog;

    const onChange = e => {
        setBlog({...blog, [e.target.name] : e.target.value});
    }

    const onSubmit = e => {
        e.preventDefault();
        updateBlog(blog);
        setAlert('Updated Blog Successsfully!', 'success');
        setTimeout(clearCurrent, 5000);


        setBlog({
            title: '',
            body: '',
            author: ''
        });

    }

    return (
        <Fragment>
        { current === null 
            ? (<h1 className='title'> Please Select a blog to update</h1>) 
            : (
           
                <div>
                    <h1 className='title'>Update Blog.</h1>
                    <form onSubmit={onSubmit} className='blog-form'>
                        <input type='text' placeholder='Enter Title' name='title' value={title} onChange={onChange} className='input-title' required/>
                        <input type='text' placeholder='Enter Body' name='body' value={body} onChange={onChange} className='input-body  ' required/>
                        <input type='submit' value='Submit' className='blog-submit' />
                    </form>
                </div>
            
            )

        }
        </Fragment>
    )
}

export default Home
