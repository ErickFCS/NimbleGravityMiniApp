import z from "zod";


export const candidateValidator = z.object({
  applicationId: z.string(),
  candidateId: z.string(),
  email: z.email(),
  firstName: z.string(),
  lastName: z.string(),
  uuid: z.string()
});

export type Candidate = z.infer<typeof candidateValidator>;
