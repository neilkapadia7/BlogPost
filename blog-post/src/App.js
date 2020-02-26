import React, { Fragment } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home  from './component/Home';
import Blogs from './component/Blogs';
import User from './component/User';
import AllBlogs from './component/AllBlogs';
import UserBlogs from './component/UserBlogs';
import Navbar from './layout/Navbar';
import NotFound from './layout/NotFound';
import BlogState from './context/blog/BlogState';
import Login from './component/auth/Login';
import Register from './component/auth/Register';
import Alerts from './layout/Alerts';
import UpdatePost from './/component/UpdatePost';

import PrivateRoute from './component/routing/PrivateRoute';

import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';

import setAuthToken from './utils/setAuthToken';

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
    <BlogState>
    <AlertState>
      <Router>
        <Fragment>
          <Navbar />
          <div style={{paddingTop: '80px'}}><Alerts /></div>
          <Switch>
            <PrivateRoute exact path='/' component={Home} />
            <PrivateRoute exact path='/update' component={UpdatePost} />
            <PrivateRoute exact path='/blogs' component={Blogs} />
            <PrivateRoute exact path='/allblogs' component={AllBlogs} />
            <PrivateRoute exact path='/user' component={User} />
            <PrivateRoute exact path='/user/:id' component={User} />
            <PrivateRoute exact path='/blogs/user/:id' component={UserBlogs} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='*' component={NotFound} />
            
          </Switch>
        </Fragment>
      </Router>
    </AlertState>
    </BlogState>
    </AuthState>
  );
}

export default App;
