import React, { useState } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import { Meteor } from 'meteor/meteor';
import "bootstrap/dist/css/bootstrap.min.css";
import { useTracker } from 'meteor/react-meteor-data';


import Home from './components/Home';
import Navigation from './components/Navigation';
import { Container } from 'react-bootstrap';



export const App = () => {
  const user = useTracker(() => Meteor.user())
  return (
    <Router>
      <Navigation />
      <Container fluid>
        <Route exact path="/" component={Home} />
        <Route exact path="/dashboard"><Dashboard user={user} /></Route>
      </Container>
    </Router >)
};
