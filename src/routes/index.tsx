import PathConstants from "./pathConstants";
import SignIn from "../app/auth/SignIn";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../app/home";

const routes = [
  { path: PathConstants.SIGN_IN, element: <SignIn /> },
  {
    element: <ProtectedRoute />,
    children: [{ path: "/", element: <Home />, index: true }],
  },
];

export default routes;
