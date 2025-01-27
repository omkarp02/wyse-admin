import { Box, Button } from "@mui/material";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQuery } from "@tanstack/react-query";
import { GET_ALL_OWNER } from "../../../constants/react-query";
import { getOwnerApi } from "../../../api/auth/owner";
import { API_GET_LIMIT } from "../../../constants/common";
import { useNavigate, useSearchParams } from "react-router-dom";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CBackDrop from "../../../components/loader/CBackDrop";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NoDataTable from "../../../components/ui/NoData";
import PathConstants from "../../../routes/pathConstants";

const FilterPage = () => {
  const navigate = useNavigate();


  return (
    <>
      <Box sx={{ padding: { xs: 2, md: 5 } }}>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button
            startIcon={<AddOutlinedIcon />}
            onClick={() => {
              navigate(PathConstants.FILTER_CREATE);
            }}
            sx={{my: 2}}
            variant="contained"
          >
            Create
          </Button>
        </Box>
 
      </Box>
    </>
  );
};

export default FilterPage;
