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
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

import { z } from "zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import useToast from "../../../hooks/useToast";
import { ICreateCategoryApi } from "../../../api/clothes/category";
import { createMasterApi, ICreateMasterApi } from "../../../api/master";
import { getMutationErrorMsg } from "../../../utils/error";
import CSnackbar from "../../../components/CSnackbar";
import { useParams } from "react-router-dom";
import _ from "lodash";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

const masterSchema = z.object({
  name: z.string(),
});

type IFormFields = z.infer<typeof masterSchema>;

const CreateMasterPage = () => {
  const { type } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormFields>({
    resolver: zodResolver(masterSchema),
  });

  if (!type ) return <></>

  const master_type = _.capitalize(type);

  const { toast, setToast, closeToast } = useToast();
  const [screenLoader, setScreenLoader] = React.useState(false);

  const createMutation = useMutation({
    mutationFn: (payload: ICreateMasterApi) => createMasterApi(payload),
    onSuccess: (data, id) => {
      reset();
      setToast("success", "master Created Successfully");
    },
    onError: (error) => {
      const { msg } = getMutationErrorMsg(error);
      setToast("error", msg);
    },
    onSettled: () => {
      setScreenLoader(false);
    },
  });

  const onSubmit: SubmitHandler<IFormFields> = async (data) => {
    console.log(data);
    setScreenLoader(true);
    createMutation.mutate({ type: type, name: data.name });
  };

  console.log(errors);

  return (
    <>
      <Box sx={{ padding: { xs: 2, md: 5 } }}>
        <Typography variant="h4" marginY={4}>
          Create Master {master_type}
        </Typography>
        <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <FormGrid size={{ xs: 12, md: 6 }}>
              <FormLabel htmlFor="first-name" required>
                {master_type} Name
              </FormLabel>
              <OutlinedInput
                type="text"
                {...register("name")}
                placeholder="Enter Filter Name here"
                size="small"
              />
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

export default CreateMasterPage;
