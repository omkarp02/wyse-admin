export type IAddress = {
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: number; // Pincode as a string to preserve leading zeros
  mobileNo: string; // Mobile number as a string to avoid number-specific issues
  alternateMobileNo?: string; // Alternate mobile number as a string
};

export type IContact = {
  type: "mobile" | "email"; // Enum-like types for predefined values
  value: string; // Contact value as a string
};
