import {
  Alert,
  AlertProps,
  Slide,
  Snackbar,
  SnackbarCloseReason,
} from "@mui/material";
import React from "react";

interface ICSnacbar extends AlertProps {
  open: boolean;
  message: string;
  handleClose: () => void;
}

const CSnackbar = ({
  open,
  message,
  severity,
  variant,
  handleClose,
}: ICSnacbar) => {
    
  const handleCloseFn = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    handleClose();
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={open}
      autoHideDuration={4000}
      TransitionComponent={Slide}
    >
      <Alert
        onClose={handleCloseFn}
        severity={severity}
        variant={"filled"}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CSnackbar;
