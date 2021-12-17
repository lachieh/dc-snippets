import { Route, Navigate, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/profile/Profile';
import { UserContextProvider } from './components/UserContext';
import Snippets from './pages/tools/Snippets';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="profile" element={<Profile />}>
          <Route path="" element={<RequireAuth>Settings</RequireAuth>} />
          <Route path="class" element={<RequireAuth>Class</RequireAuth>} />
          <Route path="delete" element={<RequireAuth>Delete</RequireAuth>} />
        </Route>
        <Route
          path="tools"
          element={<Navigate to="tools/snippets" replace />}
        />
        <Route
          path="/tools/snippets"
          element={
            <RequireAuth>
              <Snippets />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
