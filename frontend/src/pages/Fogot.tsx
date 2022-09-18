import React, { useState, SyntheticEvent } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';

const Fogot = ({setLogin}: {setLogin: Function}) => {
    const [email, setEmail] = useState('');
    const [notify, setNotify] = useState({
        show: false,
        error: false,
        message: ''
    });

    const submit = async ( e: SyntheticEvent ) => {
        e.preventDefault();
        try {
            const response = await axios.post("fogot", {
                email: email
            });

            setNotify({
                show: true,
                error: false,
                message: 'Email was sent!'
            });
        } catch(error) {
            setNotify({
                show: true,
                error: true,
                message: 'Email does not exist!'
            });
        } finally {}
    };

    let info;

    if (notify.show) {
        info = (
            <div className={(notify.error) ? "alert alert-danger": "alert alert-success"} role="alert">
                {notify.message}
            </div>
        );
    }

    return (
        <form className="form-signin" onSubmit={submit}>
            <>{info}</>
            <h1 className="h3 mb-3 font-weight-normal">Please set your email</h1>
            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input type="email" className="form-control" placeholder="Email address" required autoFocus 
                onChange={(e) => { setEmail(e.target.value) }}
            />
            <button className="btn btn-lg btn-primary btn-block" type="submit">Send Email</button>
        </form>
    );
};

export default Fogot;