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
import { useNavigate } from "react-router-dom";
import { nameSchema } from "../../../../lib/zod-schema/common";
import useToast from "../../../../hooks/useToast";
import { createFilterApi, createFilterTypeApi, ICreateFilterType } from "../../../../api/clothes/filter";
import { getMutationErrorMsg } from "../../../../utils/error";
import CSnackbar from "../../../../components/CSnackbar";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));


const filterSchema = z.object({
  name: nameSchema,
});

type IFormFields = z.infer<typeof filterSchema>;

const CreateFilterTypePage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormFields>({
    resolver: zodResolver(filterSchema),
  });

  const { toast, setToast, closeToast } = useToast();
  const [screenLoader, setScreenLoader] = React.useState(false);

  const createMutation = useMutation({
    mutationFn: (payload: ICreateFilterType) => createFilterTypeApi(payload),
    onSuccess: (data, id) => {
      console.log(data)
      // navigate(PathConstants.OWNER);
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
    setScreenLoader(true);
    createMutation.mutate(data);
  };

  console.log(errors);

  return (
    <>
      <Box sx={{ padding: { xs: 2, md: 5 } }}>
        <Typography variant="h4" marginY={4}>
          Create Filter Type
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
                placeholder="John"
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
              sx={{ width: { xs: "100%", sm: "fit-content" } }}
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

export default CreateFilterTypePage;
