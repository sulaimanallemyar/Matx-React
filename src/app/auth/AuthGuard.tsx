import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../contexts/JWTAuthContext';
const AuthGuard = ({ children }: any) => {
  const { isAuthenticated } = useUser((state) => state);
  const { pathname } = useLocation();

  if (isAuthenticated) return <>{children}</>;

  return <Navigate replace to="/session/signin" state={{ from: pathname }} />;
};

export default AuthGuard;
