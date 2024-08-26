import { z } from "zod";

// Define the UserRole enum
const UserRoleEnum = z.enum([
  "DISTRIBUTOR",
  "RETAILER",
  "MANUFACTURER",
  "DELIVERY_DRIVER",
  "SYSTEM_ADMIN",
]);

const requiredString = z.string().trim().min(1, "Required");

export const signUpSchema = z.object({
  email: requiredString.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: requiredString.regex(
    /^[a-zA-Z ]+$/,
    "Name must only contain letters and spaces"
  ),
  location: requiredString,
  role: UserRoleEnum, // Validate the role field against the UserRoleEnum
});

export const loginSchema = z.object({
  email: requiredString,
  password: requiredString,
});
