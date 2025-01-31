import { ROLE } from "../constants/common";
import PathConstants from "../routes/pathConstants";

export type INavItem = {
  id: string;
  label: string;
  path: string;
};

export type INavList = { id: string; label: string; children: INavItem[] };

export const navList: { [key: string]: INavList[] } = {
  [ROLE.ADMIN]: [
    {
      id: "user",
      label: "User",
      children: [
        {
          id: "owner",
          label: "Owner",
          path: PathConstants.OWNER,
        },
      ],
    },
    {
      id: "master",
      label: "Master",
      children: [
        {
          id: "state",
          label: "State",
          path: PathConstants.MASTER_STATE,
        },
        {
          id: "city",
          label: "City",
          path: PathConstants.MASTER_CITY,
        },
        {
          id: "gender",
          label: "Gender",
          path: PathConstants.MASTER_GENDER,
        },
        {
          id: "color",
          label: "Color",
          path: PathConstants.MASTER_COLOR,
        },
        {
          id: "collection",
          label: "Collection",
          path: PathConstants.MASTER_PRODUCT_COLLECTION,
        },
        {
          id: "bussiness_category",
          label: "Bussiness_category",
          path: PathConstants.MASTER_BUSSINESS_CATEGORY,
        },
        {
          id: "filter",
          label: "Filter",
          path: PathConstants.FILTER,
        },
        {
          id: "filter_type",
          label: "Filter Type",
          path: PathConstants.FILTER_TYPE,
        },
        
        {
          id: "category",
          label: "Category",
          path: PathConstants.CATEGORY,
        },
      ],
    },
  ],
  [ROLE.OWNER]: [
    {
      id: "bussiness",
      label: "Bussiness",
      children: [
        {
          id: " bus",
          label: "Bussiness",
          path: PathConstants.BUSSINESS,
        },
      ],
    },
    {
      id: "product_section",
      label: "Product",
      children: [
        {
          id: "product",
          label: "Product",
          path: PathConstants.PRODUCT,
        },
        {
          id: "batch",
          label: "Batch",
          path: PathConstants.PRODUCT_BATCH,
        },
      ],
    },
  ],
};

