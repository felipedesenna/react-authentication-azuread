import React from 'react';
import { Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

import Route from './Route';

import SignIn from '../pages/SignIn';

import Dashboard from '../pages/Dashboard';
import Home from '../components/home/Home'
import UserCreate from '../components/user/UserCreate'

const Routes = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />

    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route exact path='/create' component={UserCreate} />
  </Switch>
);

export default Routes;
