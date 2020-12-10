import { useEffect } from 'react';
import { Route, Redirect, RouteProps, useHistory } from 'react-router-dom';
import DefaultLayout from '../layouts/Default';
import { Types, useUser } from './UserContext';
import useApi from '../api/index';

export default function ProtectedRoute({ component, ...rest }: RouteProps) {
  const [user, dispatch] = useUser();

  // TODO: Move the auth check into the useApi hook
  /* Auth Check */
  const apiService = useApi();
  const { location } = useHistory();

  useEffect(() => {
    apiService.getCurrentUser().then((user) => {
      if (!user) {
        dispatch({
          type: Types.USER_LOGIN_FAILURE,
        });
      }
    });
  }, [location, user]);
  /* End Auth Check */

  return (
    <Route
      {...rest}
      component={
        user.loading
          ? () => (
              <DefaultLayout title="Loading...">
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-brand-light rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-brand-light rounded"></div>
                    <div className="h-4 bg-brand-light rounded w-5/6"></div>
                  </div>
                </div>
              </DefaultLayout>
            )
          : user.user
          ? component
          : () => <Redirect to="/" />
      }
    ></Route>
  );
}
