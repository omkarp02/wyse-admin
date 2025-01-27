import { ROLE } from "../constants/common";
import PathConstants from "../routes/pathConstants";

export const navList: { [key: string]: { label: string; value: string }[] } = {
  [ROLE.ADMIN]: [
    { label: "Owner", value: PathConstants.OWNER },
    { label: "Filter", value: PathConstants.FILTER },
    { label: "Filter Type", value: PathConstants.FILTER_TYPE },
    { label: "Category", value: PathConstants.CATEGORY },
  ],
  [ROLE.OWNER]: [
    { label: "Bussiness", value: PathConstants.BUSSINESS },
    { label: "Product", value: PathConstants.PRODUCT },
  ],
};
