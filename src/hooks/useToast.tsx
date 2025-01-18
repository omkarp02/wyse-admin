import React, { useState } from "react";

export type TOAST_SEVERITY = "error" | "info" | "success" | "warning";

export type IToastState = {
  show: boolean;
  severity: TOAST_SEVERITY;
  message: string;
};

export const TOAST_INITIAL_STATE: IToastState = {
  show: false,
  severity: "info",
  message: "",
};

const TOAST_INTERNAL_SERVER_ERROR = "Something Went Wrong! Try Again";

const useToast = () => {
  const [toast, setToastState] = useState<IToastState>(TOAST_INITIAL_STATE);

  function setToast(severity: TOAST_SEVERITY, message: string) {
    setToastState({ show: true, severity, message });
  }

  function closeToast() {
    setToastState(TOAST_INITIAL_STATE);
  }

  function toastISE() {
    setToast("error", TOAST_INTERNAL_SERVER_ERROR);
  }

  return { setToast, toast, closeToast, toastISE };
};

export default useToast;
