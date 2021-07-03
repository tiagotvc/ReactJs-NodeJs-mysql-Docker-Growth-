import React, { useEffect, useState } from 'react';
import Favoritos from './components/Favoritos/Favoritos'
import Register from './components/Login/Register'  
import APIs from './components/Apis/Apis'
import {BrowserRouter as Router, Switch, Route, Redirect, Link} from 'react-router-dom'



export default function App() {
  const [userId, setUserId] = useState(0);

  useEffect(() => {
      const user = localStorage.getItem("user")
      setUserId(user);
      
  }, []);

  return (
    <>


    <Router>
      
      <Switch>
        <Route path="/" exact component={APIs} />
        <Route path="/favoritos" exact component={Favoritos} /> 
        <Route path="/register" exact component={Register} />
        

      </Switch>
    </Router>
  
    </>
  );
}