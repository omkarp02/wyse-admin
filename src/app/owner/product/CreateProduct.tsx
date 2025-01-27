import * as React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Backdrop,
  CircularProgress,
  Typography,
  OutlinedInput,
  Select,
  MenuItem,
  FormLabel,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import useToast from "../../../hooks/useToast";
import CSnackbar from "../../../components/CSnackbar";
import { getMutationErrorMsg } from "../../../utils/error";
import PathConstants from "../../../routes/pathConstants";
import { productSchema } from "../../../features/owner/libs/zod-schema";
import { INITIAL_PRODUCT_VALUES } from "../../../features/owner/data/form";
import { IProductFormFields } from "../../../features/owner/types/api";
import {
  createProductApi,
  ICreateProductApi,
} from "../../../api/clothes/product";

// Zod Schema for Product Creation

// Initial Values for the Form

// Styled Grid Component
const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

const CreateProduct = () => {
  const navigate = useNavigate();
  const { toast, setToast, closeToast } = useToast();
  const [screenLoader, setScreenLoader] = React.useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IProductFormFields>({
    resolver: zodResolver(productSchema),
    defaultValues: INITIAL_PRODUCT_VALUES,
  });

  //   Variations Field Array
  const {
    fields: variationFields,
    append: appendVariation,
    remove: removeVariation,
  } = useFieldArray({
    control,
    name: "detail.variations",
  });

  // Image Links Field Array
  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray<z.infer<typeof productSchema>, "detail.imgLink">({
    control,
    name: "detail.imgLink" as const,
  });

  // Create Product Mutation
  const createProductMutation = useMutation({
    mutationFn: (payload: ICreateProductApi) => createProductApi(payload),
    onSuccess: () => {
      //   navigate(PathConstants.PRODUCT);
    },
    onError: (error) => {
      const { msg } = getMutationErrorMsg(error);
      setToast("error", msg);
    },
    onSettled: () => {
      setScreenLoader(false);
    },
  });

  // Form Submit Handler
  const onSubmit: SubmitHandler<IProductFormFields> = async (data) => {
    setScreenLoader(true);

    const { imgLink, description, variations, batchId } = data.detail;
    const newImgLink = imgLink.map((val) => val.value);

    const formattedData: ICreateProductApi = {
      productList: data.productList,
      detail: {
        batchId: batchId,
        description: description,
        imgLink: newImgLink,
        variations: variations,
      },
    };

    createProductMutation.mutate(formattedData);
  };

  return (
    <>
      <Box sx={{ padding: { xs: 2, md: 5 } }}>
        <Typography variant="h4" marginY={4}>
          Create Product
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          {/* Product List Section */}
          <Typography variant="subtitle1" my={4}>
            Product Basic Information
          </Typography>
          <Grid container spacing={3}>
            <FormGrid size={{ xs: 12, md: 6 }}>
              <FormLabel required>Product Name</FormLabel>
              <OutlinedInput
                {...register("productList.name")}
                placeholder="Product Name"
                size="small"
              />
            </FormGrid>

            <FormGrid size={{ xs: 12, md: 6 }}>
              <FormLabel required>Color</FormLabel>
              <OutlinedInput
                {...register("productList.color")}
                placeholder="Product Color"
                size="small"
              />
            </FormGrid>

            <FormGrid size={{ xs: 12, md: 6 }}>
              <FormLabel required>Price</FormLabel>
              <OutlinedInput
                type="number"
                {...register("productList.price", { setValueAs: Number })}
                placeholder="Product Price"
                size="small"
              />
            </FormGrid>

            <FormGrid size={{ xs: 12, md: 6 }}>
              <FormLabel required>Discount</FormLabel>
              <OutlinedInput
                type="number"
                {...register("productList.discount", { setValueAs: Number })}
                placeholder="Product Discount"
                size="small"
              />
            </FormGrid>

            <FormGrid size={{ xs: 12, md: 6 }}>
              <FormLabel required>Stock</FormLabel>
              <OutlinedInput
                type="number"
                {...register("productList.stock", { setValueAs: Number })}
                placeholder="Available Stock"
                size="small"
              />
            </FormGrid>

            <FormGrid size={{ xs: 12, md: 6 }}>
              <FormLabel required>Gender</FormLabel>
              <Select {...register("productList.gender")} defaultValue="M">
                <MenuItem value="M">Male</MenuItem>
                <MenuItem value="F">Female</MenuItem>
                <MenuItem value="U">Unisex</MenuItem>
              </Select>
            </FormGrid>
            <FormGrid size={{ xs: 12, md: 12 }}>
              <FormLabel required>Description</FormLabel>
              <OutlinedInput
                multiline
                rows={4}
                {...register("detail.description.productDetails")}
                placeholder="Detailed product description"
              />
            </FormGrid>
          </Grid>

          {/* Product Details Section */}
        

          {/* Variations Section */}
          <Typography variant="subtitle1" my={4}>
            Product Variations
          </Typography>
          {variationFields.map((field, index) => (
            <Grid container spacing={3} key={field.id} alignItems="end">
              <FormGrid size={{ xs: 12, md: 5 }}>
                <FormLabel required>Size</FormLabel>
                <OutlinedInput
                  {...register(`detail.variations.${index}.size`)}
                  placeholder="Product Size"
                  size="small"
                />
              </FormGrid>
              <FormGrid size={{ xs: 12, md: 5 }}>
                <FormLabel required>Price</FormLabel>
                <OutlinedInput
                  type="number"
                  {...register(`detail.variations.${index}.price`, {
                    setValueAs: Number,
                  })}
                  placeholder="Variation Price"
                  size="small"
                />
              </FormGrid>
              {index > 0 && (
                <FormGrid size={{ xs: 12, md: 2 }}>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => removeVariation(index)}
                  >
                    Remove
                  </Button>
                </FormGrid>
              )}
            </Grid>
          ))}

          <Box my={2}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => appendVariation({ size: "", price: 1000.0 })}
            >
              Add Variation
            </Button>
          </Box>

          {/* Image Links Section */}
          <Typography variant="subtitle1" my={4}>
            Product Images
          </Typography>
          {imageFields.map((field, index) => (
            <Grid container spacing={3} key={field.id} alignItems="end">
              <FormGrid size={{ xs: 12, md: 10 }}>
                <FormLabel required>Image URL</FormLabel>
                <OutlinedInput
                  {...register(`detail.imgLink.${index}`)}
                  placeholder="Image URL"
                  size="small"
                />
              </FormGrid>
              {index > 0 && (
                <FormGrid size={{ xs: 12, md: 2 }}>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => removeImage(index)}
                  >
                    Remove
                  </Button>
                </FormGrid>
              )}
            </Grid>
          ))}
          {/* 
          <Box my={2}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => appendImage("")}
            >
              Add Image
            </Button>
          </Box> */}

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
              Create Product
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Loading Backdrop */}
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={screenLoader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Toast Notification */}
      <CSnackbar
        handleClose={closeToast}
        message={toast.message}
        severity={toast.severity}
        open={toast.show}
      />
    </>
  );
};

export default CreateProduct;
