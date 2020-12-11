import { Redirect, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { UserContextProvider } from './components/UserContext';
import ProtectedRoute from './components/ProtectedRoute';
import Snippets from './pages/tools/Snippets';

function App() {
  return (
    <UserContextProvider>
      <Switch>
        <Route path="/" exact component={Home} />
        <ProtectedRoute path="/profile" component={Profile} />
        <Redirect exact from="/tools" to="/tools/snippets" />
        <ProtectedRoute path="/tools/snippets" component={Snippets} />
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </UserContextProvider>
  );
}

export default App;
