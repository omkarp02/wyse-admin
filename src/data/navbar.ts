import { ROLE } from "../constants/common";
import PathConstants from "../routes/pathConstants";

export const navList: { [key: string]: { label: string; value: string }[] } = {
  [ROLE.ADMIN]: [{ label: "Owner", value: PathConstants.OWNER }],
  [ROLE.OWNER]: [{ label: "Bussiness", value: PathConstants.BUSSINESS }],
};
