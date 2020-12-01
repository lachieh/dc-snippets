import { Redirect, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Profile from './pages/Profile';

function App() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/app" exact>
        <Redirect to="/app/dashboard" />
      </Route>
      <Route path="/app/dashboard" component={Dashboard} />
      <Route path="/app/projects" component={Projects} />
      <Route path="/profile" component={Profile} />
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

export default App;
