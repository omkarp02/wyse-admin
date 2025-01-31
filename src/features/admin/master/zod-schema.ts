import { z } from "zod";

export const masterStateSchema = z.object({
  name: z.string(),
});

export type IMasterStateFormFields = z.infer<typeof masterStateSchema>;

export const masterCitySchema = z.object({
  name: z.string(),
  stateId: z.string(),
});

export type IMasterCityFormFields = z.infer<typeof masterCitySchema>;
