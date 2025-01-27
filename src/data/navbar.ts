import { ROLE } from "../constants/common";
import PathConstants from "../routes/pathConstants";

export type INavItem = {
  id: string;
  label: string;
  path: string;
};

export type INavList = {id: string, label: string, children: INavItem[]}

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
