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
import MasterPage from "../app/admin/master";
import CreateMasterPage from "../app/admin/master/createMaster";
import MasterStatePage from "../app/admin/master/state";
import CreateMasterStatePage from "../app/admin/master/state/createMasterState";
import MasterCityPage from "../app/admin/master/city";
import CreateMasterCityPage from "../app/admin/master/city/CreateMasterCity";
import ProductBatchPage from "../app/owner/product/batch";
import CreateProductBatch from "../app/owner/product/batch/CreateBatch";

const routes = [
  { path: PathConstants.HOME, element: <Home />, index: true },
  {
    element: <UnProtectedRoute />,
    children: [{ path: PathConstants.SIGN_IN, element: <SignIn /> }],
  },
  {
    element: <ProtectedRouteUser />,
    children: [
      { path: PathConstants.BUSSINESS, element: <BussinessPage /> },
      { path: PathConstants.BUSSINESS_CREATE, element: <CreateBussiness /> },

      { path: PathConstants.PRODUCT, element: <ProductPage /> },
      { path: PathConstants.PRODUCT_CREATE, element: <CreateProduct /> },
      { path: PathConstants.PRODUCT_BATCH, element: <ProductBatchPage /> },
      { path: PathConstants.PRODUCT_BATCH_CREATE, element: <CreateProductBatch /> },
    ],
  },
  {
    element: <ProtectedRouteAdmin />,
    children: [
      { path: PathConstants.OWNER, element: <OwnerPage /> },
      { path: PathConstants.CREATE_OWNER, element: <CreateOwnerPage /> },

      { path: PathConstants.CATEGORY, element: <CategoryPage /> },
      { path: PathConstants.CATEGORY_CREATE, element: <CreateCategoryPage /> },

      { path: PathConstants.FILTER, element: <FilterPage /> },
      { path: PathConstants.FILTER_CREATE, element: <CreateFilter /> },
      { path: PathConstants.FILTER_TYPE, element: <FilterTypePage /> },
      { path: PathConstants.FILTER_TYPE_CREATE, element: <CreateFilterType /> },

      { path: PathConstants.MASTER, element: <MasterPage /> },
      { path: PathConstants.MASTER_CREATE, element: <CreateMasterPage /> },

      { path: PathConstants.MASTER_CITY, element: <MasterCityPage /> },
      { path: PathConstants.MASTER_CITY_CREATE, element: <CreateMasterCityPage /> },

      { path: PathConstants.MASTER_STATE, element: <MasterStatePage /> },
      { path: PathConstants.MASTER_STATE_CREATE, element: <CreateMasterStatePage /> },
    ],
  },
];

export default routes;
