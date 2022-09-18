import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import Fogot from './pages/Fogot';
import Reset from './pages/Reset';
import Nav from './components/Nav';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    (async () => {
        try {
          const response = await axios.get("user");
          const user = response.data;
          setUser(user);
        } catch( error ) {
          setUser(null);
        } finally {}
    })();

    return () => {};
  }, [login]);

  return (
    <div className="App">
      <BrowserRouter>
        <Nav user={user} setLogin={() => { setLogin(false) }}/>
        <Route path="/" exact component={() => (<Home user={user}/>)} />
        <Route path="/login" component={() => (<Login setLogin={() => { setLogin(true) }}/>)} />
        <Route path="/register" component={Register} />
        <Route path="/fogot" component={Fogot} />
        <Route path="/reset/:token" component={Reset} />
      </BrowserRouter>
    </div>
  );
}

export default App;
