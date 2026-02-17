import { candidateValidator } from "../types/candidate.type";
import { CustomError } from "../types/customError.type";
import {
  JobApplication,
  jobApplicationValidator
} from "../types/jobApplication.type";
import { jobPositionValidator } from "../types/jobPosition.type";
import axios from "axios";
import z from "zod";


const jobAPI = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
});

const buildRejection = (target: z.ZodSafeParseError<any>) => {
  return Promise.reject({
    details: z.treeifyError(target.error),
    timestamp: new Date().toISOString(),
    type: "validation error"
  } as CustomError);
};

export const getCandidateData = async (candidateEmail: string) => {
  const parsedCandidateEmail = z.email().safeParse(candidateEmail);
  if (!parsedCandidateEmail.success)
    return buildRejection(parsedCandidateEmail);

  const response = await jobAPI.get<unknown>("/api/candidate/get-by-email", {
    params: {
      email: parsedCandidateEmail.data
    }
  });

  const candidate = candidateValidator.safeParse(response.data);
  if (!candidate.success) return buildRejection(candidate);

  return candidate;
};

export const getJobPositions = async () => {
  const response = await jobAPI.get("/api/jobs/get-list");

  const jobPositions = z.array(jobPositionValidator).safeParse(response.data);
  if (!jobPositions.success) return buildRejection(jobPositions);

  return jobPositions;
};

export const submitJobApplication = async (jobApplication: JobApplication) => {
  const parsedJobApplication =
    jobApplicationValidator.safeParse(jobApplication);
  if (!parsedJobApplication.success)
    return buildRejection(parsedJobApplication);

  const response = await jobAPI.post(
    "/api/candidate/apply-to-job",
    parsedJobApplication.data
  );

  const success = z.object({ ok: true }).safeParse(response.data);
  if (!success.success) return buildRejection(success);

  return success;
};
