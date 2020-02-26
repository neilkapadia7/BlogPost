import React, {Fragment, useContext} from 'react';
import {Link} from 'react-router-dom';
import AuthContext from '../context/auth/authContext';

const Navbar = () => {
    const authContext = useContext(AuthContext);

    const { isAuthenticated, logout, user } = authContext;

    const onLogout = () => {
        logout();
    }

    const authLinks = (
        <Fragment>
            <li><a href='#!'>Hello { user && user.name}!</a></li>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/blogs'>My Blogs</Link></li>
            <li><Link to='/allblogs'>Blogs</Link></li>
            <li><a href='#!' onClick={onLogout}>Log Out</a></li>        
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <li><Link to='/register'>Register</Link></li>
            <li><Link to='/login'>Login</Link></li>
        </Fragment>            
    )

    return (
        <div className='Nav'>
            <div className='navtitle'>BlogPost</div>
            <div className='navroute'>
                <ul>
                    {isAuthenticated ? authLinks : guestLinks}
                </ul>
            </div>
        </div>
    )
}

export default Navbar
