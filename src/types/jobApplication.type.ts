import z from "zod";


export const jobApplicationValidator = z.object({
  canditateId: z.string(),
  jobId: z.string(),
  repoUrl: z.url(),
  uuid: z.string()
});

export type JobApplication = z.infer<typeof jobApplicationValidator>;
