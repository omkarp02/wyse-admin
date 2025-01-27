import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid2";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";
import { DateField } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import AddIcon from "@mui/icons-material/Add";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import {
  addressSchema,
  contactSchema,
  descriptionSchema,
  emailSchema,
  genderSchema,
  mobileSchema,
  nameSchema,
  websiteSchema,
} from "../../../lib/zod-schema/common";
import { z } from "zod";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import { zodResolver } from "@hookform/resolvers/zod";
import { IApiError } from "../../../types/errors";
import useToast, { TOAST_INITIAL_STATE } from "../../../hooks/useToast";
import { ERROR_STATUS } from "../../../constants/errors";
import CSnackbar from "../../../components/CSnackbar";
import CDateField from "../../../components/formfields/CDateFields";
import { useMutation } from "@tanstack/react-query";
import DeleteIcon from "@mui/icons-material/Delete";
import { createOwnerApi, ICreateOwnerApi } from "../../../api/auth/owner";
import { getMutationErrorMsg } from "../../../utils/error";
import { useNavigate } from "react-router-dom";
import PathConstants from "../../../routes/pathConstants";
import {
  createBusinessApi,
  ICreateBussinessApi,
} from "../../../api/auth/bussiness";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

const businessSchema = z.object({
  name: nameSchema,
  category: nameSchema,
  description: descriptionSchema,
  address: addressSchema,
  contacts: z.array(contactSchema),
  website: websiteSchema,
  logoUrl: websiteSchema,
});

export type IFormFields = z.infer<typeof businessSchema>;

const INITIAL_VALUE_CREATE_BUSINESS: IFormFields = {
  name: "Demo busienss",
  category: "saloon",
  description: "hello",
  address: {
    address: "13 Main street near brooklyn",
    city: "Hong Kong",
    state: "Bancong",
    country: "some",
    pincode: 433534,
    mobileNo: "2348334343",
    alternateMobileNo: "7348334343",
  },
  contacts: [
    {
      type: "mobile",
      value: "9875856784",
    },
  ],
  website: "https://pawaromkar.in",
  logoUrl: "https://pawaromkar.in",
};

const CreateBussiness = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormFields>({
    resolver: zodResolver(businessSchema),
    defaultValues: INITIAL_VALUE_CREATE_BUSINESS,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "contacts", // Field name in the form
  });

  const { toast, setToast, closeToast } = useToast();
  const [screenLoader, setScreenLoader] = React.useState(false);

  const createMutation = useMutation({
    mutationFn: (payload: ICreateBussinessApi) => createBusinessApi(payload),
    onSuccess: (data, id) => {
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


  return (
    <>
      <Box sx={{ padding: { xs: 2, md: 5 } }}>
        <Typography variant="h4" marginY={4}>
          Create Bussiness
        </Typography>
        <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="subtitle1" my={4}>
            Details
          </Typography>
          <Grid container spacing={3}>
            <FormGrid size={{ xs: 12, md: 6 }}>
              <FormLabel htmlFor="first-name" required>
                Full Name
              </FormLabel>
              <OutlinedInput
                type="text"
                {...register("name")}
                placeholder="John Doe"
                autoComplete="Name"
                size="small"
              />
            </FormGrid>
            <FormGrid size={{ xs: 12, md: 6 }}>
              <FormLabel htmlFor="last-name" required>
                Category
              </FormLabel>
              <OutlinedInput
                type="text"
                {...register("category")}
                placeholder="Doe"
                autoComplete="last name"
                size="small"
              />
            </FormGrid>
            <FormGrid size={{ xs: 12, md: 6 }}>
              <FormLabel htmlFor="last-name" required>
                Description
              </FormLabel>
              <OutlinedInput
                type="text"
                {...register("description")}
                placeholder="johndoe@email.com"
                autoComplete="full name"
                size="small"
              />
            </FormGrid>
            <FormGrid size={{ xs: 12, md: 6 }}>
              <FormLabel htmlFor="last-name" required>
                Website
              </FormLabel>
              <OutlinedInput
                type="text"
                {...register("website")}
                placeholder="Website"
                size="small"
              />
            </FormGrid>
            <FormGrid size={{ xs: 12, md: 6 }}>
              <FormLabel htmlFor="last-name" required>
                Logo Url
              </FormLabel>
              <OutlinedInput
                type="text"
                {...register("logoUrl")}
                placeholder="Logo Url"
                size="small"
              />
            </FormGrid>
          </Grid>

          <Typography variant="subtitle1" my={4}>
            Contact
          </Typography>
          <Grid container spacing={3} alignItems={"end"}>
            {fields.map((field, index) => (
              <React.Fragment key={field.id}>
                <FormGrid size={{ xs: 12, md: 5 }}>
                  <FormLabel htmlFor="last-name" required>
                    Type
                  </FormLabel>
                  <Select
                    {...register(`contacts.${index}.type`)}
                    defaultValue={field.type || "mobile"}
                    label="Type"
                  >
                    <MenuItem value={"mobile"}>Mobile</MenuItem>
                    <MenuItem value={"email"}>Email</MenuItem>
                  </Select>
                </FormGrid>

                <FormGrid size={{ xs: 12, md: 5 }}>
                  <FormLabel htmlFor="last-name" required>
                    Value
                  </FormLabel>
                  <OutlinedInput
                    type="text"
                    {...register(`contacts.${index}.value`)}
                    placeholder="Enter contact value"
                    size="small"
                  />
                </FormGrid>

                <FormGrid size={{ xs: 5, md: 1 }}>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => append({ type: "mobile", value: "" })}
                    sx={{ width: { xs: "100%", sm: "fit-content" } }}
                  >
                    Add
                  </Button>
                </FormGrid>
                {index !== 0 && (
                  <FormGrid size={{ xs: 1, md: 1 }}>
                    <Button
                      variant="contained"
                      startIcon={<DeleteIcon />}
                      onClick={() => remove(index)}
                      sx={{ width: { xs: "100%", sm: "fit-content" } }}
                    >
                      Delete
                    </Button>
                  </FormGrid>
                )}
              </React.Fragment>
            ))}
          </Grid>

          <Typography variant="subtitle1" my={4}>
            Address
          </Typography>
          <Grid container spacing={3}>
            {/* Address */}
            <FormGrid size={{ xs: 12, md: 6 }}>
              <FormLabel htmlFor="address" required>
                Address
              </FormLabel>
              <OutlinedInput
                type="text"
                {...register("address.address")}
                placeholder="13 Main street near Brooklyn"
                autoComplete="street-address"
                size="small"
              />
            </FormGrid>

            {/* City */}
            <FormGrid size={{ xs: 12, md: 6 }}>
              <FormLabel htmlFor="city" required>
                City
              </FormLabel>
              <OutlinedInput
                type="text"
                {...register("address.city")}
                placeholder="Hong Kong"
                autoComplete="address-level2"
                size="small"
              />
            </FormGrid>

            {/* State */}
            <FormGrid size={{ xs: 12, md: 6 }}>
              <FormLabel htmlFor="state" required>
                State
              </FormLabel>
              <OutlinedInput
                type="text"
                {...register("address.state")}
                placeholder="Bancong"
                autoComplete="address-level1"
                size="small"
              />
            </FormGrid>

            {/* Country */}
            <FormGrid size={{ xs: 12, md: 6 }}>
              <FormLabel htmlFor="country" required>
                Country
              </FormLabel>
              <OutlinedInput
                type="text"
                {...register("address.country")}
                placeholder="Country"
                autoComplete="country-name"
                size="small"
              />
            </FormGrid>

            {/* Pincode */}
            <FormGrid size={{ xs: 12, md: 6 }}>
              <FormLabel htmlFor="pincode" required>
                Pincode
              </FormLabel>
              <OutlinedInput
                type="text"
                {...register("address.pincode")}
                placeholder="433534"
                autoComplete="postal-code"
                size="small"
              />
            </FormGrid>

            {/* Mobile Number */}
            <FormGrid size={{ xs: 12, md: 6 }}>
              <FormLabel htmlFor="mobileNo" required>
                Mobile Number
              </FormLabel>
              <OutlinedInput
                type="text"
                {...register("address.mobileNo")}
                placeholder="2348334343"
                autoComplete="tel"
                size="small"
              />
            </FormGrid>

            {/* Alternate Mobile Number */}
            <FormGrid size={{ xs: 12, md: 6 }}>
              <FormLabel htmlFor="alternateMobileNo" required>
                Alternate Mobile Number
              </FormLabel>
              <OutlinedInput
                type="text"
                {...register("address.alternateMobileNo")}
                placeholder="7348334343"
                autoComplete="tel"
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

export default CreateBussiness;
