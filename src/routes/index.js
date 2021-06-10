import React from 'react';
import { Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

import Route from './Route';

import SignIn from '../pages/SignIn';

import Dashboard from '../pages/Dashboard';
import Home from '../components/home/Home'
import UserCreate from '../components/user/UserCreate'
import PrintersHomeV2 from '../components/printer/PrinterHomeV2'
import PrintersCreate from '../components/printer/PrinterCrud'

const Routes = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/dashboard" exact component={Dashboard} isPrivate />
    <Route exact path='/create' component={UserCreate} isPrivate />
    <Route path='/printers' component={PrintersHomeV2} isPrivate />
    <Route exact path='/printers/create' component={PrintersCreate} />
  </Switch>
);

export default Routes;
