import React, { useState, SyntheticEvent } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';

const Login = ({setLogin}: {setLogin: Function}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async ( e: SyntheticEvent ) => {
        e.preventDefault();
        const response = await axios.post("login", {
            email: email,
            password: password
        });

        setRedirect(true);
        setLogin();
    };

    if( redirect ){
        return (
            <Redirect to="/" />
        )
    }

    return (
        <form className="form-signin" onSubmit={submit}>
            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input type="email" className="form-control" placeholder="Email address" required autoFocus 
                onChange={(e) => { setEmail(e.target.value) }}
            />
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input type="password" className="form-control" placeholder="Password" required 
                onChange={(e) => { setPassword(e.target.value) }}
            />
            <div className="mb-3">
                <Link to="/fogot">Fogot Password</Link>
            </div>
            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>
    );
};

export default Login;