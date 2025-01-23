import PathConstants from "./pathConstants";
import SignIn from "../app/auth/SignIn";
import Home from "../app/home";
import CreateOwnerPage from "../app/admin/owner/createOwner";
import OwnerPage from "../app/admin/owner";
import { ProtectedRouteAdmin, ProtectedRouteUser } from "./ProtectedRoute";
import { UnProtectedRoute } from "./UnProtectedRoutes";
import BussinessPage from "../app/owner/bussiness";
import CreateBussiness from "../app/owner/bussiness/CreateBussiness";

const routes = [
  {
    element: <UnProtectedRoute />,
    children: [
      { path: PathConstants.SIGN_IN, element: <SignIn /> },
    ],
  },
  {
    element: <ProtectedRouteUser />,
    children: [
      { path: PathConstants.HOME, element: <Home />, index: true },
    ],
  },
  {
    element: <ProtectedRouteUser />,
    children: [
      { path: PathConstants.BUSSINESS, element: <BussinessPage />},
      { path: PathConstants.BUSSINESS_CREATE, element: <CreateBussiness />},
    ],
  },
  {
    element: <ProtectedRouteAdmin />,
    children: [
      { path: PathConstants.HOME, element: <Home />, index: true },
      { path: PathConstants.OWNER, element: <OwnerPage /> },
      { path: PathConstants.CREATE_OWNER, element: <CreateOwnerPage /> },
    ],
  },
];

export default routes;
