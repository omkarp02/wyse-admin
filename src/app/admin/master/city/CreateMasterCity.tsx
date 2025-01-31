import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid2";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";
import { DateField } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  FormControl,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";

import { z } from "zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  IMasterCityFormFields,
  IMasterStateFormFields,
  masterCitySchema,
  masterStateSchema,
} from "../../../../features/admin/master/zod-schema";
import useToast from "../../../../hooks/useToast";
import {
  createStateApi,
  getStateApi,
  ICreateStateApi,
} from "../../../../api/master/state";
import { getMutationErrorMsg } from "../../../../utils/error";
import CSnackbar from "../../../../components/CSnackbar";
import { createCityApi, ICreateCityApi } from "../../../../api/master/city";
import { GET_ALL_STATE } from "../../../../constants/react-query";
import { API_GET_LIMIT } from "../../../../constants/common";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

const CreateMasterCityPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IMasterCityFormFields>({
    resolver: zodResolver(masterCitySchema),
  });

  const { toast, setToast, closeToast } = useToast();
  const [screenLoader, setScreenLoader] = React.useState(false);

  const createMutation = useMutation({
    mutationFn: (payload: ICreateCityApi) => createCityApi(payload),
    onSuccess: (data, id) => {
      reset();
      setToast("success", "City Created Successfully");
    },
    onError: (error) => {
      const { msg } = getMutationErrorMsg(error, "State");
      setToast("error", msg);
    },
    onSettled: () => {
      setScreenLoader(false);
    },
  });

  const { data } = useQuery({
    queryKey: [GET_ALL_STATE],
    queryFn: async () => await getStateApi({ page: 1, limit: API_GET_LIMIT }),
  });

  const onSubmit: SubmitHandler<IMasterCityFormFields> = async (data) => {
    setScreenLoader(true);
    createMutation.mutate(data);
  };

  const stateList = data?.data;

  return (
    <>
      <Box sx={{ padding: { xs: 2, md: 5 } }}>
        <Typography variant="h4" marginY={4}>
          Create City
        </Typography>
        <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <FormGrid size={{ xs: 12, md: 6 }}>
              <FormLabel htmlFor="first-name" required>
                Name
              </FormLabel>
              <OutlinedInput
                type="text"
                {...register("name")}
                placeholder="Enter Filter Name here"
                size="small"
              />
            </FormGrid>
            <FormGrid size={{ xs: 12, md: 6 }}>
              <FormLabel htmlFor="first-name" required>
                State
              </FormLabel>
              <Select defaultValue={""} label="" {...register("stateId")}>
                {stateList?.map((e: any) => (
                  <MenuItem  value={e.id}>{e.name}</MenuItem>
                ))}
              </Select>
            </FormGrid>
          </Grid>
          <Box
            sx={[
              {
                display: "flex",
                alignItems: "end",
                pb: { xs: 12, sm: 0 },
                mt: { xs: 2, sm: 0 },
                mb: "60px",
              },
              { justifyContent: "flex-end" },
            ]}
          >
            <Button
              variant="contained"
              type="submit"
              sx={{ width: { xs: "100%", sm: "fit-content" }, mt: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={screenLoader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <CSnackbar
        handleClose={closeToast}
        message={toast.message}
        severity={toast.severity}
        open={toast.show}
      />
    </>
  );
};

export default CreateMasterCityPage;
