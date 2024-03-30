import { Navigate } from 'react-router-dom';
import useAuthContext from '../../hooks/useAuthContext';

const AuthRoute = ({ children }) => {
  const { isAuthenticated } = useAuthContext();
  console.log("isAuthenisAuthenticated",isAuthenticated)
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return <>{children}</>
}
export default AuthRoute;