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

const ProductPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const name = searchParams.get("name");

  // const { data, isLoading, isError } = useQuery({
  //   queryKey: [GET_ALL_OWNER, name],
  //   queryFn: async () =>
  //     await getOwnerApi({ page: 1, limit: API_GET_LIMIT, name: name }),
  // });

  const bussinessList: any[] = []

  return (
    <>
      <Box sx={{ padding: { xs: 2, md: 5 } }}>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button
            startIcon={<AddOutlinedIcon />}
            onClick={() => {
              navigate(PathConstants.PRODUCT_CREATE);
            }}
            sx={{my: 2}}
            variant="contained"
          >
            Create
          </Button>
        </Box>
        <Box>
          {bussinessList ? <TableContainer component={Paper}>
            <Table  sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">First Name</TableCell>
                  <TableCell align="center">Last Name</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  bussinessList.map((row: any, index: number) => (
                    <TableRow
                      key={row.email}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">{row.firstname}</TableCell>
                      <TableCell align="center">{row.lastname}</TableCell>
                      <TableCell align="center" sx={{display: "flex", gap: 1}}><DeleteIcon /><EditIcon /></TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer> : <NoDataTable title="No data to display" message="Create some data"  />}
        </Box>
      </Box>
      <CBackDrop screenLoader={false} />
    </>
  );
};

export default ProductPage;
