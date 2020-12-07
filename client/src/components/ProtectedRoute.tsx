import { PropsWithChildren } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import DefaultLayout from '../layouts/Default';
import { useUser } from './UserContext';

export default function ProtectedRoute(props: PropsWithChildren<RouteProps>) {
  const [user] = useUser();

  return (
    <Route {...props}>
      {user.loading ? (
        <DefaultLayout title="Loading...">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-brand-light rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-brand-light rounded"></div>
              <div className="h-4 bg-brand-light rounded w-5/6"></div>
            </div>
          </div>
        </DefaultLayout>
      ) : user.user ? (
        props.children
      ) : (
        <Redirect to="/" />
      )}
    </Route>
  );
}
