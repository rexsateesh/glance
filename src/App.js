import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { LayoutRoute } from './components/layout';
import Dashboard from './components/dashboard';
import Integration from './components/integration';
import Analytics from './components/analytics';
import Report from './components/report';
import Insight from './components/insight';
import Contact from './components/contact';

function App() {
  return (
    <Router>
      <Switch>
        <LayoutRoute exact path="/" component={Dashboard} />
        <LayoutRoute exact path="/integration" component={Integration} />
        <LayoutRoute exact path="/analytics" component={Analytics} />
        <LayoutRoute exact path="/reports" component={Report} />
        <LayoutRoute exact path="/insights" component={Insight} />
        <LayoutRoute exact path="/contact" component={Contact} />
      </Switch>
    </Router>
  );
}

export default App;
