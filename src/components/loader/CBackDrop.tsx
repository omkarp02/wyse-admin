import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

type ICBackDrop = {
  screenLoader: boolean;
};

const CBackDrop = ({ screenLoader }: ICBackDrop) => {
  return (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={screenLoader}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default CBackDrop;
