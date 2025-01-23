import { DateField } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React from "react";
import { Controller } from "react-hook-form";

export interface ICDateField {
  control: any;
  isError: boolean;
  helperText: string | undefined;
  name: string;
}

 const CDateField = ({name, control, isError, helperText }: ICDateField) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <DateField
          {...field}
          variant="outlined"
          format="DD-MM-YYYY"
          onChange={(newValue) => {
            field.onChange(newValue ? newValue.toDate() : null); // Convert dayjs object to JS Date
          }}
          value={field.value ? dayjs(field.value) : null} // Convert JS Date to dayjs
          slotProps={{
            textField: {
              error: isError,
              helperText: helperText || "",
            },
          }}
        />
      )}
    />
  );
};

export default CDateField