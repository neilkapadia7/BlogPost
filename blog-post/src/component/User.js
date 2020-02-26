import React, {useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import BlogContext from '../context/blog/blogContext';
import Spinner from './spinner.gif';
import '../App.css';
import AuthContext from '../context/auth/authContext';


const User = (Userid) => {
    const authContext = useContext(AuthContext);
    
    const blogContext = useContext(BlogContext);
    const {getUser, user, removeUser} = blogContext;
    
    useEffect(() => {
        authContext.loadUser();
        
        getUser(Userid.match.params.id);
         

        return () => {
            removeUser();
        }
        //eslint-disable-next-line
    }, []);
    
    return (
        <div>
            {user !== null 
                ? (
                <div>
                    <h1 className='title-name'>{user.name}</h1>
                    <p className='title-username'>{user.email}</p>
                    <div className='data-div'>
                        <p className='title-data'><strong>Email Id: </strong>  {user.email}</p>
                        {/* <p className='title-data'><strong>Phone Number: </strong>  {user.phone}</p>
                        <p className='title-data'><strong>Website: </strong>  {user.website}</p>
                        <p className='title-data'><strong>Address: </strong> {user.address.street},{user.address.suite},{user.address.city},{user.address.zipcode}</p>
                        <p className='title-data'><strong>Company: </strong> {user.company.name}</p> */}
                        <Link to={`/blogs/user/${user._id}`}  className='blog-user'>View Blogs</Link>
                    </div>
                   </div>
                ) 
                : <img src={Spinner} alt='loading'/>}
        </div>
    )
}

export default User
