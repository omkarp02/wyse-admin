import { z } from "zod";

// Reusable password schema
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long") // Minimum length
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter") // At least one uppercase letter
  .regex(/[a-z]/, "Password must contain at least one lowercase letter") // At least one lowercase letter
  .regex(/[0-9]/, "Password must contain at least one number") // At least one number
  .regex(/[@$!%*?&]/, "Password must contain at least one special character") // At least one special character
  .max(100, "Password must be less than 100 characters long"); // Maximum length

export const emailSchema = z
  .string()
  .email("Invalid email address") // Validate email format
  .min(5, "Email must be at least 5 characters long");

export const mobileSchema = z
  .string()
  .regex(/^\d{10}$/, { message: "Mobile number must be 10 digits" });

export const genderSchema = z.enum(["male", "female", "other"], {
  message: "Gender must be male, female, or other",
});

export const pincodeSchema = z
  .number()
  .int()
  .min(100000, { message: "Pincode must be at least 6 digits" })
  .max(999999, { message: "Pincode must be at most 6 digits" });

export const AddressSchema = z.object({
  address: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  pincode: pincodeSchema,
  mobileNo: mobileSchema,
  alternateMobileNo: mobileSchema,
});

export const nameSchema = z
  .string()
  .min(1, "Name must be at least 1 characters long");
