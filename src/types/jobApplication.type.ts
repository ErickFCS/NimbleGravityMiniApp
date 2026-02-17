import z from "zod";


export const jobApplicationValidator = z.object({
  applicationId: z.string(),
  candidateId: z.string(),
  jobId: z.string(),
  repoUrl: z.url(),
  uuid: z.string()
});

export type JobApplication = z.infer<typeof jobApplicationValidator>;
