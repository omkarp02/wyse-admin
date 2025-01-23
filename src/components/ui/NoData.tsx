import { Box, Grid2, Typography } from "@mui/material";
import React from "react";

type INoDataTable = {
  message?: string;
  title: string;
};

const NoDataTable = ({ message, title }: INoDataTable) => {
  return (
    <Grid2 spacing={2} alignContent={"center"} justifyContent={"center"}  sx={{ minHeight: "400px" }}>
      <Typography variant="h3">{title}</Typography>
      <Typography variant="h6">{message}</Typography>
    </Grid2>
  );
};

export default NoDataTable;
