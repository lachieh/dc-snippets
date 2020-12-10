import { Redirect, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Profile from './pages/Profile';
import { UserContextProvider } from './components/UserContext';
import React from 'react';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <UserContextProvider>
      <Switch>
        <Route path="/" exact component={Home} />
        <ProtectedRoute path="/app" exact component={Dashboard} />
        <ProtectedRoute path="/app/projects" component={Projects} />
        <ProtectedRoute path="/profile" component={Profile} />
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </UserContextProvider>
  );
}

export default App;
