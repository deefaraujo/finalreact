import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Relatorios from '../pages/Relatorios'

const Routes: React.FC = () => (
  <Switch>
    <Route path='/' exact component={Dashboard} />
    <Route path='/exames/:laboratorio' exact component={Relatorios} />
  </Switch>
)

export default Routes
