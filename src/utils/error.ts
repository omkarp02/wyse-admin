import { ERROR_STATUS } from "../constants/errors";
import { IToastState } from "../hooks/useToast";
import { IApiError } from "../types/errors";

export function getMutationErrorMsg(error: any): {
  msg: string;
  status: number;
} {
  let msg = "Something Went Wrong!";

  const finalError = error?.response?.data;
  const status = finalError?.status ?? 1;
  if (finalError) {
    if (status === ERROR_STATUS.INVALID_CRED) {
      msg = "Invalid Credentails";
    } else if (status === ERROR_STATUS.ALREADY_EXIST) {
      msg = "Account already exists, please sign in";
    }
  }
  return { msg, status };
}
