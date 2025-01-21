import { Navigate, Outlet } from 'react-router-dom';
import { useBoundStore } from '../store/store';
import PathConstants from './pathConstants';

const ProtectedRoute = () => {
  
  const token = useBoundStore(state => state.token)

  if(!token) return  <Navigate to={PathConstants.SIGN_IN} replace />;

  return <Outlet />;
};

export default ProtectedRoute;