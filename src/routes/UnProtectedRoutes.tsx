import { Navigate, Outlet } from 'react-router-dom';
import { useBoundStore } from '../store/store';
import PathConstants from './pathConstants';

export const UnProtectedRoute = () => {
  
  const token = useBoundStore(state => state.token)

  if(token) return  <Navigate to={PathConstants.HOME} replace />;

  return <Outlet />;
};

