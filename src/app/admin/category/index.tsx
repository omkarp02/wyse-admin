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
import { GET_ALL_CATEGORY, GET_ALL_OWNER } from "../../../constants/react-query";
import { getOwnerApi } from "../../../api/auth/owner";
import { API_GET_LIMIT } from "../../../constants/common";
import { useNavigate, useSearchParams } from "react-router-dom";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CBackDrop from "../../../components/loader/CBackDrop";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NoDataTable from "../../../components/ui/NoData";
import PathConstants from "../../../routes/pathConstants";
import { get } from "react-hook-form";
import { getCategoryApi } from "../../../api/clothes/category";

const OwnerPage = () => {
  const navigate = useNavigate();


  const { data, isLoading, isError } = useQuery({
    queryKey: [GET_ALL_CATEGORY],
    queryFn: async () =>
      await getCategoryApi({ page: 1, limit: API_GET_LIMIT }),
  });

  const list = data?.data;

  return (
    <>
      <Box sx={{ padding: { xs: 2, md: 5 } }}>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button
            startIcon={<AddOutlinedIcon />}
            onClick={() => {
              navigate(PathConstants.CATEGORY_CREATE);
            }}
            sx={{my: 2}}
            variant="contained"
          >
            Create
          </Button>
        </Box>
        <Box >
          {list ? <TableContainer component={Paper}>
            <Table   aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Slug</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  list.map((row: any, index: number) => (
                    <TableRow
                      key={row.email}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">{row.slug}</TableCell>
                      <TableCell align="center" sx={{display: "flex", gap: 1}}><DeleteIcon /><EditIcon /></TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer> : <NoDataTable title="No data to display" message="Create some data"  />}
        </Box>
      </Box>
      <CBackDrop screenLoader={isLoading} />
    </>
  );
};

export default OwnerPage;
