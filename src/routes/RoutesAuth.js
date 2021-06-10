/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import UserCreate from '../components/user/UserCreate'
import PrinterHomeV2 from '../components/printer/PrinterHomeV2'
import PrintersCreate from '../components/printer/PrinterCrud'

export default props =>
<Switch>
    <Route exact path='/dashboard' component={Home} />
    <Route exact path='/create' component={UserCreate} />
    <Route exact path='/printers' component={PrinterHomeV2} />
    <Route exact path='/printers/create' component={PrintersCreate} />
    {/* <Redirect from='*' to='/' /> */}
</Switch>