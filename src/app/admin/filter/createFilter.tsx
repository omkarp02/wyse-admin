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
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  createFilterApi,
  getFilterTypeApi,
  ICreateFilter,
  IGET_FILTER_TYPE,
} from "../../../api/clothes/filter";
import { getMutationErrorMsg } from "../../../utils/error";
import CSnackbar from "../../../components/CSnackbar";
import {
  GET_ALL_CATEGORY,
  GET_ALL_FILTER_TYPE,
} from "../../../constants/react-query";
import { getCategoryApi, IGET_CATEGORY } from "../../../api/clothes/category";
import { API_GET_LIMIT } from "../../../constants/common";
import CBackDrop from "../../../components/loader/CBackDrop";
import useToast from "../../../hooks/useToast";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

const filterSchema = z.object({
  type: z.string(),
  name: z.string(),
  category: z.string(),
});

type IFormFields = z.infer<typeof filterSchema>;

const CreateFilterTypePage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<IFormFields>({
    resolver: zodResolver(filterSchema),
  });

  const { data: categoryList, isLoading: categoryLoading } = useQuery({
    queryKey: [GET_ALL_CATEGORY],
    queryFn: async () =>
      await getCategoryApi({ page: 1, limit: API_GET_LIMIT }),
  });

  const { data: filterTypeList, isLoading: filterTypeLoading } = useQuery({
    queryKey: [GET_ALL_FILTER_TYPE],
    queryFn: async () =>
      await getFilterTypeApi({ page: 1, limit: API_GET_LIMIT }),
  });

  const { toast, setToast, closeToast } = useToast();
  const [screenLoader, setScreenLoader] = React.useState(false);

  const createMutation = useMutation({
    mutationFn: (payload: ICreateFilter) => createFilterApi(payload),
    onSuccess: (data, id) => {
      reset()
      setToast("success", "Filter Created Successfully")
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
          Create Filter
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
                placeholder="Enter Filter Name Here"
                size="small"
              />
            </FormGrid>
            <FormGrid size={{ xs: 12, md: 6 }}>
              <FormLabel htmlFor="first-name" required>
                Category
              </FormLabel>
              <Select label="Type" {...register("category")}>
                {categoryList?.data?.map((e: IGET_CATEGORY) => (
                  <MenuItem value={e.id}>{e.name}</MenuItem>
                ))}
              </Select>
            </FormGrid>
            <FormGrid size={{ xs: 12, md: 6 }}>
              <FormLabel htmlFor="first-name" required>
                Type
              </FormLabel>
              <Select label="Type" {...register("type")}>
                {filterTypeList?.data?.map((e: IGET_FILTER_TYPE) => (
                  <MenuItem value={e.id}>{e.name}</MenuItem>
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
                mt: { xs: 2, sm: 3 },
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
      <CBackDrop screenLoader={categoryLoading || filterTypeLoading} />
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
