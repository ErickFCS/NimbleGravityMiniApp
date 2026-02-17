import { JobPosition } from "../types/jobPosition.type";
import { useFormik } from "formik";
import z from "zod";


export const JobEntry = ({ jobPosition, submitHadler }: { jobPosition: JobPosition, submitHadler: (jobPositionId: string, githubURL: string) => void }) => {
  const formik = useFormik({
    initialValues: {
      githubURL: ""
    },
    onSubmit: values => {
      submitHadler(jobPosition.id, values.githubURL);
    },
    validate(values) {
      let errors = {} as any;
      if (!z.url().safeParse(values.githubURL).success)
        errors.githubURL = true;
      return errors;
    }
  });

  return (
    <div className="card w-full bg-base-100 card-md shadow-sm">
      <form className="card-body" onSubmit={formik.handleSubmit}>
        <h2 className="card-title">{jobPosition.title}</h2>
        <span className="flex flex-row gap-2">
          <label className="input grow-1">
            <span className="label">Github Repo URL</span>
            <input className={`${formik.errors.githubURL && formik.touched.githubURL ? "input-error" : ""}`} name="githubURL" type="text" onChange={formik.handleChange} value={formik.values.githubURL} placeholder="https://github.com/..." />
          </label>
          <button className="btn btn-success" type="submit" >Submit</button>
        </span>
      </form>
    </div>
  );
};
