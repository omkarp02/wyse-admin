import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useBoundStore } from '../store/store';
import PathConstants from './pathConstants';
import { ROLE } from '../constants/common';

export const ProtectedRouteUser = () => {
  
  const token = useBoundStore(state => state.token)

  if(!token) return  <Navigate to={PathConstants.SIGN_IN} replace />;

  return <Outlet />;
};

export const ProtectedRouteOwner = () => {
  
  const location = useLocation()

  const token = useBoundStore(state => state.token)
  const role = useBoundStore(state => state.role)
  if(token && role === ROLE.OWNER) return <Outlet />  ;

  const navigateTo = location.state?.from ?? PathConstants.HOME

  return <Navigate to={navigateTo} replace />;
};

export const ProtectedRouteAdmin = () => {
  
  const location = useLocation()

  const token = useBoundStore(state => state.token)
  const role = useBoundStore(state => state.role)
  if(token && role === ROLE.ADMIN) return <Outlet />  ;

  const navigateTo = location.state?.from ?? PathConstants.HOME

  return <Navigate to={navigateTo} replace />;
};
