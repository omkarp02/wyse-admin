import PathConstants from "./pathConstants";
import SignIn from "../app/auth/SignIn";
import Home from "../app/home";
import CreateOwnerPage from "../app/admin/owner/createOwner";
import OwnerPage from "../app/admin/owner";
import { ProtectedRouteAdmin, ProtectedRouteUser } from "./ProtectedRoute";
import { UnProtectedRoute } from "./UnProtectedRoutes";
import BussinessPage from "../app/owner/bussiness";
import CreateBussiness from "../app/owner/bussiness/CreateBussiness";
import ProductPage from "../app/owner/product";
import CreateProduct from "../app/owner/product/CreateProduct";
import FilterPage from "../app/admin/filter";
import CreateFilter from "../app/admin/filter/createFilter";
import CreateFilterType from "../app/admin/filter/filter_type/createFilterType";
import FilterTypePage from "../app/admin/filter/filter_type";
import CategoryPage from "../app/admin/category";
import CreateCategoryPage from "../app/admin/category/createCategory";

const routes = [
  {
    element: <UnProtectedRoute />,
    children: [{ path: PathConstants.SIGN_IN, element: <SignIn /> }],
  },
  {
    element: <ProtectedRouteUser />,
    children: [
      { path: PathConstants.HOME, element: <Home />, index: true },
      { path: PathConstants.BUSSINESS, element: <BussinessPage /> },
      { path: PathConstants.BUSSINESS_CREATE, element: <CreateBussiness /> },
      { path: PathConstants.PRODUCT, element: <ProductPage /> },
      { path: PathConstants.PRODUCT_CREATE, element: <CreateProduct /> },
    ],
  },
  {
    element: <ProtectedRouteAdmin />,
    children: [
      { path: PathConstants.HOME, element: <Home />, index: true },
      { path: PathConstants.OWNER, element: <OwnerPage /> },
      { path: PathConstants.CATEGORY, element: <CategoryPage /> },
      { path: PathConstants.CATEGORY_CREATE, element: <CreateCategoryPage /> },
      { path: PathConstants.CREATE_OWNER, element: <CreateOwnerPage /> },
      { path: PathConstants.FILTER, element: <FilterPage /> },
      { path: PathConstants.FILTER_CREATE, element: <CreateFilter /> },
      { path: PathConstants.FILTER_TYPE, element: <FilterTypePage /> },
      { path: PathConstants.FILTER_TYPE_CREATE, element: <CreateFilterType /> },
    ],
  },
];

export default routes;
