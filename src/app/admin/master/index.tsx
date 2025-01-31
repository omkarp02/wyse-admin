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
import { useNavigate, useParams } from "react-router-dom";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PathConstants from "../../../routes/pathConstants";
import { getMasterApi } from "../../../api/master";
import { GET_ALL_MASTER } from "../../../constants/react-query";
import NoDataTable from "../../../components/ui/NoData";
import CBackDrop from "../../../components/loader/CBackDrop";
import { API_GET_LIMIT } from "../../../constants/common";

const getPathFromType: { [key: string]: string } = {
  "bussiness-category": PathConstants.MASTER_BUSSINESS_CATEGORY_CREATE,
  gender: PathConstants.MASTER_GENDER_CREATE,
  color: PathConstants.MASTER_COLOR_CREATE,
  "product-collection": PathConstants.MASTER_PRODUCT_COLLECTION_CREATE
};

const MasterPage = () => {
  const navigate = useNavigate();
  const { type } = useParams();

  if (!type) return <></>;

  const { data, isLoading } = useQuery({
    queryKey: [GET_ALL_MASTER, type],
    queryFn: async () =>
      await getMasterApi({ page: 1, limit: 100, types: [type] }),
  });

  const path = getPathFromType[type];
  const list = data?.data?.[type];


  return (
    <>
      <Box sx={{ padding: { xs: 2, md: 5 } }}>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button
            startIcon={<AddOutlinedIcon />}
            onClick={() => {
              navigate(path);
            }}
            sx={{ my: 2 }}
            variant="contained"
          >
            Create
          </Button>
        </Box>
        <Box>
          {list ? (
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {list?.map((row: any, index: number) => (
                    <TableRow
                      key={row.email}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell
                        align="center"
                        sx={{ display: "flex", gap: 1 }}
                      >
                        <DeleteIcon />
                        <EditIcon />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <NoDataTable
              title="No data to display"
              message="Create some data"
            />
          )}
        </Box>
      </Box>
      <CBackDrop screenLoader={isLoading} />
    </>
  );
};

export default MasterPage;
