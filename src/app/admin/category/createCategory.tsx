import * as React from "react";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid2";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Switch,
  Typography,
} from "@mui/material";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useToast from "../../../hooks/useToast";
import { getMutationErrorMsg } from "../../../utils/error";
import CSnackbar from "../../../components/CSnackbar";
import {
  categorySchema,
  ICategoryFormFields,
} from "../../../features/admin/category/zod-schema";
import {
  createCategoryApi,
  ICreateCategoryApi,
} from "../../../api/clothes/category";
import { CREATE_CATEGORY_INITIAL_VALUE } from "../../../features/admin/category/data";
import { STATUS } from "../../../constants/common";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

const CreateCategoryPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICategoryFormFields>({
    resolver: zodResolver(categorySchema),
    defaultValues: CREATE_CATEGORY_INITIAL_VALUE
  });

  const { toast, setToast, closeToast } = useToast();
  const [screenLoader, setScreenLoader] = React.useState(false);

  const createMutation = useMutation({
    mutationFn: (payload: ICreateCategoryApi) => createCategoryApi(payload),
    onSuccess: (data, id) => {
      setToast("success", "Category Created Successfully")
      reset()
      // navigate(PathConstants.OWNER);
    },
    onError: (error) => {
      const { msg } = getMutationErrorMsg(error, "Category");
      setToast("error", msg);
    },
    onSettled: () => {
      setScreenLoader(false);
    },
  });

  const onSubmit: SubmitHandler<ICategoryFormFields> = async (data) => {
    setScreenLoader(true);

    const formattedData: ICreateCategoryApi = {
      ...data,
      status: data.isActive ? STATUS.ACTIVE : STATUS.IN_ACTIVE
    }

    createMutation.mutate(formattedData);
  };

  return (
    <>
      <Box sx={{ padding: { xs: 2, md: 5 } }}>
        <Typography variant="h4" marginY={4}>
          Create Category
        </Typography>
        <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <FormGrid size={{ xs: 12, md: 6 }}>
              <FormLabel htmlFor="first-name" required>
                Description
              </FormLabel>
              <OutlinedInput
                type="text"
                {...register("description")}
                placeholder="John"
                size="small"
              />
            </FormGrid>
            <FormGrid size={{ xs: 12, md: 6 }}>
              <FormLabel htmlFor="first-name" required>
                Icon
              </FormLabel>
              <OutlinedInput
                type="text"
                {...register("icon")}
                placeholder="John"
                size="small"
              />
            </FormGrid>
            <FormGrid size={{ xs: 12, md: 6 }}>
              <FormLabel htmlFor="first-name" required>
                Img Link
              </FormLabel>
              <OutlinedInput
                type="text"
                {...register("imgLink")}
                placeholder="John"
                size="small"
              />
            </FormGrid>
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
            <FormGrid size={{ xs: 12, md: 6 }}>
              <FormLabel htmlFor="first-name" required>
                Slug
              </FormLabel>
              <OutlinedInput
                type="text"
                {...register("slug")}
                placeholder="John"
                size="small"
              />
            </FormGrid>
            <FormGrid size={{ xs: 12, md: 6 }}>
              <FormLabel htmlFor="first-name" required>
                Active
              </FormLabel>
              <Switch {...register("isActive")} defaultChecked />
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

export default CreateCategoryPage;
