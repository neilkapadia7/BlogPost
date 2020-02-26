import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';


const Register = props => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    
    const {setAlert} = alertContext;
    const {register, error, clearErrors, isAuthenticated} = authContext;

    useEffect(() => {
        if(isAuthenticated) {
            //For Redirecting if it is authenticated
            props.history.push('/')
        }
        if(error === 'User Already Exists') {
            setAlert(error, 'danger');    
            clearErrors();
        }

        //eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const {name, email, password, password2} = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        if(name === '' || email === '' || password === '' || password2 === ''){
            setAlert('Please enter all fields', 'danger');
        }
        else if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
        }
        else{
            register({
                name,
                email,
                password
            });
        }
    }

    return (
        <div className='reg-log-div'>
            <h1 className='text-primary'>
                Account <span className='text-primary-color'>Register</span>
            </h1>

        <div className='form-container'>

            <div className='form-content'>
                <div className='form-content-2'>    
                    <h1>Post all your blogs with 
                        <br />
                    <strong>BlogSpot</strong></h1>
                    <p> BlogPost is a coding education platform to share and learn among a group of likeminded coders. </p>
                    <Link to='/login' className='sign-up-button'>Login</Link>
                </div>
            </div>
            
            <form onSubmit={onSubmit }>

                <div className='form'>
                    <div className='form-group'>
                        <label htmlFor='name'>Name</label>
                        <input type='text' name='name' value={name} onChange={onChange} required/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='email'>Email Address</label>
                        <input type='email' name='email' value={email} onChange={onChange} required/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' name='password' value={password} onChange={onChange} minLength='6' required/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password2'>Confirm Password</label>
                        <input type='password' name='password2' value={password2} onChange={onChange} minLength='6' required/>
                    </div>
                    <center>
                        <input type='submit' value='Register' className='btn btn-primary btn-block' />
                    </center>    
                    <center>    
                        <Link to='/login'> Have an account?</Link>
                    </center>
                </div>
            </form>
        </div>

        </div>
    )
}

export default Register
