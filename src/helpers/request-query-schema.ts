import { z } from 'zod';

export const RequestQuerySchema = z.object({
  limit: z
    .string()
    .optional()
    .transform((value) => (value ? +value : undefined)),
  offset: z
    .string()
    .optional()
    .transform((value) => (value ? +value : undefined)),
});
export const config = {
  api: {
    bodyParser: false,
  },
};
