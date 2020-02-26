import React, {useEffect, useContext, useState, Fragment} from 'react';
import BlogContext from '../context/blog/blogContext';
import '../App.css';
import AuthContext from '../context/auth/authContext';
import AlertContext from '../context/alert/alertContext'


const Home = props => {
    const authContext = useContext(AuthContext);
    const blogContext = useContext(BlogContext);
    const alertContext = useContext(AlertContext);
    
    const { addBlog} = blogContext;
    const {user, loadUser, isAuthenticated} = authContext;
    const {setAlert} = alertContext;

    useEffect(() => {
        loadUser();
        
        if(user !== null && isAuthenticated === true) {
            setBlog({...blog, author: user.name})
        }

        //eslint-disable-next-line
    }, [isAuthenticated, user]);

    
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
        console.log(blog);
        addBlog(blog);
        setAlert('Your Blog Has Been Submitted Successsfully!', 'success'); 	

        setBlog({
            title: '',
            body: ''
        });

    }

    return (
        <Fragment>
        { user === null 
            ? (<h1> Please Wait</h1>) 
            : (
           
                <div>
                    <h1 className='title'>Add A New Blog!</h1>
                    <form onSubmit={onSubmit} className='blog-form'>
                        <input type='text' placeholder='Enter Title' name='title' value={title} onChange={onChange} className='input-title' required/>
                        <input type='text' placeholder='Enter Body' name='body' value={body} onChange={onChange} className='input-body' required/>
                        <input type='submit' value='Submit' className='blog-submit'/>
                    </form>
                </div>
            
            )

        }
        </Fragment>
    )
}

export default Home
