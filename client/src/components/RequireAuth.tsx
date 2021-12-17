import { useUser } from './UserContext';
import { Navigate } from 'react-router-dom';
import { PropsWithChildren, ReactElement } from 'react';

interface Props {
  to?: string;
  replace?: boolean;
}

const RequireAuth = ({
  children,
  to = '/',
  replace = false,
}: PropsWithChildren<Props>): ReactElement => {
  const [user] = useUser();
  return user.user ? <>{children}</> : <Navigate to={to} replace={replace} />;
};

export default RequireAuth;
