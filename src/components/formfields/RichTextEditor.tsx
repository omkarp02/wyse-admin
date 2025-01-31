import { Controller } from "react-hook-form";
import QuillEditor from "react-quill";
import "react-quill/dist/quill.snow.css";

export interface IRichTextEditor {
  control: any;
  isError: boolean;
  helperText: string | undefined;
  name: string;
}

const RichTextEditor = ({
  name,
  control,
}: IRichTextEditor) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <QuillEditor
          theme="snow"
          {...field}
          onChange={(newValue) => {
            field.onChange(newValue); // Convert dayjs object to JS Date
          }}
          value={field.value}
        ></QuillEditor> // Convert JS Date to dayjs />
        // <DateField
        //   {...field}
        //   variant="outlined"
        //   format="DD-MM-YYYY"
        //   onChange={(newValue) => {
        //     field.onChange(newValue ? newValue.toDate() : null); // Convert dayjs object to JS Date
        //   }}
        //   value={field.value ? dayjs(field.value) : null} // Convert JS Date to dayjs
        //   slotProps={{
        //     textField: {
        //       error: isError,
        //       helperText: helperText || "",
        //     },
        //   }}
        // />
      )}
    />
  );
};

export default RichTextEditor;
