import React,{useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom'; 
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';


const Login = props => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    
    const {setAlert} = alertContext;
    const {login, error, clearErrors, isAuthenticated} = authContext;

    useEffect(() => {
        if(isAuthenticated) {
            //For Redirecting if it is authenticated
            props.history.push('/')
        }
        if(error === 'Invalid Credentials') {
            setAlert(error, 'danger');    
            clearErrors();
        }
        if(error === 'Invalid Password') {
            setAlert(error, 'danger');    
            clearErrors();
        }
        if(error === 'Invalid Email Id') {
            setAlert(error, 'danger');    
            clearErrors();
        }

        //eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const {email, password} = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        if( email === '' || password === ''){
            setAlert('Please enter all fields', 'danger');
        }
        
        else{
            login({
                email,
                password
            });
        }
    }
    
    return (
        <div className='reg-log-div'>
            <h1 className='text-primary'>
                Account <span className='text-primary-color'>Login</span>
            </h1>

            <div className='form-container'>
                
                <div className='form-content'>
                    <div className='form-content-2'>    
                        <h1>Post all your blogs with 
                            <br />
                        <strong>BlogSpot</strong></h1>
                        <p> BlogPost is a coding education platform to share and learn among a group of likeminded coders. </p>
                        <Link to='/register' className='sign-up-button'>Sign Up</Link>
                    </div>
                </div>
                
                <form onSubmit={onSubmit }>
                    <div className='form'>
                        <h1>BS</h1>
                        <div className='form-group'>
                            <label htmlFor='email'>Email Address</label>
                            <input type='email' name='email' value={email} onChange={onChange} required />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='password'>Password</label>
                            <input type='password' name='password' value={password} onChange={onChange} minLength='6' required/>
                        </div>
                        <center>
                            <input type='submit' value='Login' className='btn btn-primary btn-block' />
                        </center>    
                        <center>    
                            <Link to='/register'>Don't have an account?</Link>
                        </center>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
