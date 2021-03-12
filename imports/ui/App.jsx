import React, { useState } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import { Meteor } from 'meteor/meteor';
import "bootstrap/dist/css/bootstrap.min.css";
import { useTracker } from 'meteor/react-meteor-data';


import Home from './components/Home';
import Navigation from './components/Navigation';
import { Container } from 'react-bootstrap';
import ListPage from './components/ListPage';

import { useAccount } from '../ui/hooks/accounts';



export const App = () => {
  const ComingSoon = () => <div>Coming Soon!</div>
  const { user, isLoggedIn } = useAccount();
  return (
    <Router>
      <Navigation />
      <Container>
        <Route exact path="/" component={Home} />
        <Route exact path="/dashboard"><Dashboard user={user} /></Route>
        <Route exact path="/notebooks"><ComingSoon /></Route>
        <Route exact path="/dashboard/:id"><ListPage /></Route>
      </Container>
    </Router >)
};
