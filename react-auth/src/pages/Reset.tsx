import React, { useState, SyntheticEvent } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const Reset = ({match}: {match: any}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async ( e: SyntheticEvent ) => {
        e.preventDefault();
        const token = match.params.token;
        const response = await axios.post("reset", {
            email: email,
            password: password,
            password_confirm: passwordConfirm,
            token: token
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
            <h1 className="h3 mb-3 font-weight-normal">Reset Your Password</h1>
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
            <button className="btn btn-lg btn-primary btn-block" type="submit">Reset Password</button>
        </form>
    );
};

export default Reset;