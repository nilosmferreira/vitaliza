import { z } from 'zod';

export const RequestQuerySchema = z.object({
  limit: z
    .string()
    .nullish()
    .transform((value) => {
      return value ? +value : 10;
    }),
  offset: z
    .string()
    .nullish()
    .transform((value) => {
      return value ? +value : 0;
    }),
});
export const config = {
  api: {
    bodyParser: false,
  },
};
