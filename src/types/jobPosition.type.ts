import z from "zod";


export const jobPositionValidator = z.object({
  id: z.string(),
  title: z.string()
});

export type JobPosition = z.infer<typeof jobPositionValidator>;
