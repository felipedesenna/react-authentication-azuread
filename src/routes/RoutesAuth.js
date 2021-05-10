/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import UserCreate from '../components/user/UserCreate'
import PrinterCrud from '../components/printer/PrinterCrud'

export default props =>
<Switch>
    <Route exact path='/dashboard' component={Home} />
    <Route exact path='/create' component={UserCreate} />
    <Route exact path='/printers' component={PrinterCrud} />
    <Redirect from='*' to='/' />
</Switch>