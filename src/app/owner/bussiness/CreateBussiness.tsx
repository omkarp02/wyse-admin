// import * as React from "react";
// import Checkbox from "@mui/material/Checkbox";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import FormLabel from "@mui/material/FormLabel";
// import Grid from "@mui/material/Grid2";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import { styled } from "@mui/material/styles";
// import { DateField } from "@mui/x-date-pickers";
// import dayjs from "dayjs";
// import {
//   Backdrop,
//   Box,
//   Button,
//   CircularProgress,
//   FormControl,
//   Radio,
//   RadioGroup,
//   Typography,
// } from "@mui/material";
// import {
//   addressSchema,
//   AddressSchema,
//   contactSchema,
//   emailSchema,
//   genderSchema,
//   mobileSchema,
//   nameSchema,
// } from "../../../lib/zod-schema/common";
// import { z } from "zod";
// import { Controller, SubmitHandler, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { IApiError } from "../../../types/errors";
// import useToast, { TOAST_INITIAL_STATE } from "../../../hooks/useToast";
// import { ERROR_STATUS } from "../../../constants/errors";
// import CSnackbar from "../../../components/CSnackbar";
// import CDateField from "../../../components/formfields/CDateFields";
// import { useMutation } from "@tanstack/react-query";
// import { createOwnerApi, ICreateOwnerApi } from "../../../api/auth/owner";
// import { getMutationErrorMsg } from "../../../utils/error";
// import { useNavigate } from "react-router-dom";
// import PathConstants from "../../../routes/pathConstants";

// const FormGrid = styled(Grid)(() => ({
//   display: "flex",
//   flexDirection: "column",
// }));


// // const businessSchema = z.object({
// //   name: z.string(),
// //   category: z.enum(["saloon", "restaurant", "clinic", "general_store", "medical_store"]), // Add other categories as needed
// //   description: z.string(),
// //   address: addressSchema,
// //   contacts: z.array(contactSchema),
// //   website: z.string().url("Invalid URL"),
// //   logoUrl: z.string().url("Invalid URL"),
// // });

// type IFormFields = z.infer<typeof ownerSchema>;

// const CreateBussiness = () => {
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm<IFormFields>({
//     resolver: zodResolver(ownerSchema),
//   });

//   const { toast, setToast, closeToast } = useToast();
//   const [screenLoader, setScreenLoader] = React.useState(false);

//   const createMutation = useMutation({
//     mutationFn: (payload: ICreateOwnerApi) => createOwnerApi(payload),
//     onSuccess: (data, id) => {
//       navigate(PathConstants.OWNER);
//     },
//     onError: (error) => {
//       const { msg } = getMutationErrorMsg(error);
//       setToast("error", msg);
//     },
//     onSettled: () => {
//       setScreenLoader(false);
//     },
//   });

//   const onSubmit: SubmitHandler<IFormFields> = async (data) => {
//     setScreenLoader(true);
//     const formattedData = {
//       ...data,
//       type: "email",
//     };
//     createMutation.mutate(formattedData);
//   };

//   console.log(errors);

//   return (
//     <>
//       <Box sx={{ padding: { xs: 2, md: 5 } }}>
//         <Typography variant="h4" marginY={4}>
//           Create Owner
//         </Typography>
//         <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
//           <Grid container spacing={3}>
//             <FormGrid size={{ xs: 12, md: 6 }}>
//               <FormLabel htmlFor="first-name" required>
//                 First name
//               </FormLabel>
//               <OutlinedInput
//                 type="text"
//                 {...register("firstname")}
//                 placeholder="John"
//                 autoComplete="first name"
//                 size="small"
//               />
//             </FormGrid>
//             <FormGrid size={{ xs: 12, md: 6 }}>
//               <FormLabel htmlFor="last-name" required>
//                 Last name
//               </FormLabel>
//               <OutlinedInput
//                 type="text"
//                 {...register("lastname")}
//                 placeholder="Doe"
//                 autoComplete="last name"
//                 size="small"
//               />
//             </FormGrid>
//             <FormGrid size={{ xs: 12, md: 6 }}>
//               <FormLabel htmlFor="last-name" required>
//                 Email
//               </FormLabel>
//               <OutlinedInput
//                 type="email"
//                 {...register("email")}
//                 placeholder="johndoe@email.com"
//                 autoComplete="full name"
//                 size="small"
//               />
//             </FormGrid>
//             <FormGrid size={{ xs: 12, md: 6 }}>
//               <FormLabel htmlFor="last-name" required>
//                 Password
//               </FormLabel>
//               <OutlinedInput
//                 type="password"
//                 {...register("password")}
//                 placeholder="Password"
//                 size="small"
//               />
//             </FormGrid>
//             <FormGrid size={{ xs: 12, md: 6 }}>
//               <FormLabel htmlFor="last-name" required>
//                 Display Name
//               </FormLabel>
//               <OutlinedInput
//                 type="text"
//                 {...register("name")}
//                 placeholder="John Doe"
//                 autoComplete="display name"
//                 size="small"
//               />
//             </FormGrid>
//             <FormGrid size={{ xs: 12, md: 6 }}>
//               <FormLabel htmlFor="last-name" required>
//                 Mobile No.
//               </FormLabel>
//               <OutlinedInput
//                 type="text"
//                 {...register("mobileNo")}
//                 placeholder="John"
//                 autoComplete="first name"
//                 size="small"
//               />
//             </FormGrid>
//             <FormGrid size={{ xs: 12, md: 6 }}>
//               <FormLabel htmlFor="last-name" required>
//                 Date of Birth
//               </FormLabel>
//               <CDateField
//                 control={control}
//                 helperText={errors.dateofbirth?.message}
//                 isError={!!errors.dateofbirth}
//                 name="dateofbirth"
//               />
//             </FormGrid>
//             <FormGrid size={{ xs: 12, md: 6 }}>
//               <FormControl>
//                 <FormLabel id="demo-row-radio-buttons-group-label">
//                   Gender
//                 </FormLabel>
//                 <RadioGroup
//                   row
//                   aria-labelledby="demo-row-radio-buttons-group-label"
//                   name="row-radio-buttons-group"
//                 >
//                   <FormControlLabel
//                     {...register("gender")}
//                     value="female"
//                     control={<Radio />}
//                     label="Female"
//                   />
//                   <FormControlLabel
//                     {...register("gender")}
//                     value="male"
//                     control={<Radio />}
//                     label="Male"
//                   />
//                   <FormControlLabel
//                     {...register("gender")}
//                     value="other"
//                     control={<Radio />}
//                     label="Other"
//                   />
//                 </RadioGroup>
//               </FormControl>
//             </FormGrid>
//           </Grid>
//           <Box
//             sx={[
//               {
//                 display: "flex",
//                 alignItems: "end",
//                 pb: { xs: 12, sm: 0 },
//                 mt: { xs: 2, sm: 0 },
//                 mb: "60px",
//               },
//               { justifyContent: "flex-end" },
//             ]}
//           >
//             <Button
//               variant="contained"
//               type="submit"
//               sx={{ width: { xs: "100%", sm: "fit-content" } }}
//             >
//               Submit
//             </Button>
//           </Box>
//         </Box>
//       </Box>
//       <Backdrop
//         sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
//         open={screenLoader}
//       >
//         <CircularProgress color="inherit" />
//       </Backdrop>
//       <CSnackbar
//         handleClose={closeToast}
//         message={toast.message}
//         severity={toast.severity}
//         open={toast.show}
//       />
//     </>
//   );
// };

// export default CreateBussiness;
import React from 'react'

const CreateBussiness = () => {
  return (
    <div>CreateBussiness</div>
  )
}

export default CreateBussiness
