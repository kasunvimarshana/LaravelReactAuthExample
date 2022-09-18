import React, { useState, SyntheticEvent } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async ( e: SyntheticEvent ) => {
        e.preventDefault();
        const response = await axios.post("register", {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            password_confirm: passwordConfirm,
        });

        setRedirect(true);
    };

    if( redirect ){
        return (
            <Redirect to="/login" />
        )
    }

    return (
        <form className="form-signin" onSubmit={submit}>
            <h1 className="h3 mb-3 font-weight-normal">Please register</h1>
            <label className="sr-only">First Name</label>
            <input type="text" className="form-control" placeholder="First Name" required autoFocus
                onChange={(e) => { setFirstName(e.target.value) }}
            />
            <label className="sr-only">Last Name</label>
            <input type="text" className="form-control" placeholder="Last Name" required
                onChange={(e) => { setLastName(e.target.value) }}
            />
            <label className="sr-only">Email</label>
            <input type="email" className="form-control" placeholder="Email" required
                onChange={(e) => { setEmail(e.target.value) }}
            />
            <label className="sr-only">Password</label>
            <input type="password" className="form-control" placeholder="Password" required
                onChange={(e) => { setPassword(e.target.value) }}
            />
            <label className="sr-only">Password Confirm</label>
            <input type="password" className="form-control" placeholder="Password Confirm" required
                onChange={(e) => { setPasswordConfirm(e.target.value) }}
            />
            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>
    );
};

export default Register;