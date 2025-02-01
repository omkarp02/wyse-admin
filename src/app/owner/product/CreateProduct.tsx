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
  Divider,
} from "@mui/material";
import QuillEditor from "react-quill";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import useToast from "../../../hooks/useToast";
import CSnackbar from "../../../components/CSnackbar";
import { getMutationErrorMsg } from "../../../utils/error";
import PathConstants from "../../../routes/pathConstants";
import {
  IProductSchemaFormFields,
  productSchema,
} from "../../../features/owner/libs/zod-schema";
import { INITIAL_PRODUCT_VALUES } from "../../../features/owner/data/form";
import {
  createProductApi,
  ICreateProductApi,
} from "../../../api/clothes/product";
import { API_GET_LIMIT } from "../../../constants/common";
import {
  GET_ALL_CATEGORY,
  GET_ALL_FILTER,
  GET_ALL_MASTER,
  GET_ALL_PRODUCT_BATCH,
  GET_ALL_SIZE,
} from "../../../constants/react-query";
import { getMasterApi } from "../../../api/master";
import RichTextEditor from "../../../components/formfields/RichTextEditor";
import { getCategoryApi } from "../../../api/clothes/category";
import { getBatchApi } from "../../../api/clothes/batch";
import { getFilterApi } from "../../../api/clothes/filter";
import { slugify } from "../../../utils/helper";

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
    watch,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm<IProductSchemaFormFields>({
    resolver: zodResolver(productSchema),
    defaultValues: INITIAL_PRODUCT_VALUES,
  });

  console.log(">>>>>>>>> value", getValues().detail.variations);

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

  const { data: masterData } = useQuery({
    queryKey: [GET_ALL_MASTER],
    queryFn: async () =>
      await getMasterApi({
        page: 1,
        limit: 100,
        types: ["color", "gender", "product-collection"],
      }),
  });

  const { data: categoryData } = useQuery({
    queryKey: [GET_ALL_CATEGORY],
    queryFn: async () =>
      await getCategoryApi({
        page: 1,
        limit: 100,
      }),
  });

  const { data: batchData } = useQuery({
    queryKey: [GET_ALL_PRODUCT_BATCH],
    queryFn: async () =>
      await getBatchApi({
        page: 1,
        limit: 100,
      }),
  });

  const category = watch("productList.category");
  const name = watch("name");

  const { data: sizeData } = useQuery({
    queryKey: [GET_ALL_FILTER, category],
    queryFn: async () =>
      await getFilterApi({
        page: 1,
        limit: 100,
        category,
        type: "6798b34aaeb9c16dd25aa381",
      }),
  });

  const colorList = masterData?.data?.color;
  const genderList = masterData?.data?.gender;
  const productCollection = masterData?.data?.["product-collection"];
  const batchList = batchData?.data;
  const categoryList = categoryData?.data;
  const sizeList = sizeData?.data;

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
  const onSubmit: SubmitHandler<IProductSchemaFormFields> = async (data) => {
    setScreenLoader(true);

    const { imgLink, description, variations } = data.detail;
    const newImgLink = imgLink.map((val: any) => val.value);

    data.productList.imgLink = newImgLink[0];

    const formattedData: ICreateProductApi = {
      productList: data.productList,
      detail: {
        description: description,
        imgLink: newImgLink,
        variations: variations,
      },
      batchId: data.batchId,
      slug: data.slug,
      name: data.name,
    };
    createProductMutation.mutate(formattedData);
  };

  React.useEffect(() => {
    setValue("slug", slugify(name));
  }, [name]);

  console.log({ errors });

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
                {...register("name")}
                placeholder="Product Name"
                size="small"
              />
            </FormGrid>
            <FormGrid size={{ xs: 12, md: 6 }}>
              <FormLabel required>Product Slug</FormLabel>
              <OutlinedInput
                {...register("slug")}
                placeholder="Product Slug"
                size="small"
              />
            </FormGrid>

            <FormGrid size={{ xs: 12, md: 6 }}>
              <FormLabel required>Color</FormLabel>
              <Select {...register("productList.color")}>
                {colorList?.map((e: any) => (
                  <MenuItem value={e.name}>{e.name}</MenuItem>
                ))}
              </Select>
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
              <FormLabel required>Batch</FormLabel>
              <Select {...register("batchId")}>
                {batchList?.map((e: any) => (
                  <MenuItem value={e.code}>{e.name}</MenuItem>
                ))}
              </Select>
            </FormGrid>

            <FormGrid size={{ xs: 12, md: 6 }}>
              <FormLabel required>Category</FormLabel>
              <Select {...register("productList.category")}>
                {categoryList?.map((e: any) => (
                  <MenuItem value={e.id}>{e.name}</MenuItem>
                ))}
              </Select>
            </FormGrid>

            <FormGrid size={{ xs: 12, md: 6 }}>
              <FormLabel required>Gender</FormLabel>
              <Select {...register("productList.gender")}>
                {genderList?.map((e: any) => (
                  <MenuItem value={e.id}>{e.name}</MenuItem>
                ))}
              </Select>
            </FormGrid>

            <FormGrid size={{ xs: 12, md: 6 }}>
              <FormLabel required>Collection</FormLabel>
              <Select
                defaultValue={[]}
                {...register("productList.collection")}
                multiple
              >
                {productCollection?.map((e: any) => (
                  <MenuItem value={e.name}>{e.name}</MenuItem>
                ))}
              </Select>
            </FormGrid>

            <FormGrid size={{ xs: 12, md: 12 }}>
              <FormLabel required>Description</FormLabel>
              <RichTextEditor
                control={control}
                name="detail.description.productDetails"
                helperText={errors.detail?.description?.productDetails?.message}
                isError={!!errors.detail?.description?.productDetails}
              />
            </FormGrid>
          </Grid>

          {/* Product Details Section */}

          {/* Variations Section */}
          <Typography variant="subtitle1" my={4} mt={10}>
            Product Variations
          </Typography>
          {variationFields.map((field, index) => (
            <Grid container spacing={3} mt={4} key={field.id} alignItems="end">
              <Divider></Divider>
              <FormGrid size={{ xs: 12, md: 3 }}>
                <FormLabel required>Size</FormLabel>
                <Select {...register(`detail.variations.${index}.size`)}>
                  {sizeList?.map((e: any) => (
                    <MenuItem value={e.name}>{e.name}</MenuItem>
                  ))}
                </Select>
              </FormGrid>
              <FormGrid size={{ xs: 12, md: 3 }}>
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
              <FormGrid size={{ xs: 12, md: 3 }}>
                <FormLabel required>Discount</FormLabel>
                <OutlinedInput
                  type="number"
                  {...register(`detail.variations.${index}.discount`, {
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
              onClick={() =>
                appendVariation({ size: "", price: 0, discount: 0 })
              }
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
                  {...register(`detail.imgLink.${index}.value`)}
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

          <Box my={2}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => appendImage({ value: "" })}
            >
              Add Image
            </Button>
          </Box>

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
