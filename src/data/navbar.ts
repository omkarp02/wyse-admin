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
      ],
    },
  ],
};
// export const navList: { [key: string]: { label: string; value: string }[] } = {
//   [ROLE.ADMIN]: [
//     { label: "Owner", value: PathConstants.OWNER },
//     { label: "Filter", value: PathConstants.FILTER },
//     { label: "Filter Type", value: PathConstants.FILTER_TYPE },
//     { label: "Category", value: PathConstants.CATEGORY },
//   ],
//   [ROLE.OWNER]: [
//     { label: "Bussiness", value: PathConstants.BUSSINESS },
//     { label: "Product", value: PathConstants.PRODUCT },
//   ],
// };
