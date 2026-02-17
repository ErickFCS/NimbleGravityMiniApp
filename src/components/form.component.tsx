import { useFormik } from "formik";
import z from "zod";


export const Form = ({ continueHandler }: { continueHandler: (email: string) => void }) => {

  const formik = useFormik({
    initialValues: {
      email: ""
    },
    onSubmit(values) {
      continueHandler(values.email);
    },
    validate(values) {
      let errors = {} as any;
      if (!z.email().safeParse(values.email).success)
        errors.email = true;
      return errors;
    }
  });

  return (
    <div className="w-full min-h-dvh flex justify-center items-start md:items-center p-2">
      <form className="fieldset bg-base-200 border-base-300 rounded-box w-md border p-4 min-w-[80dvw] md:min-w-1/4" onSubmit={formik.handleSubmit}>
        <legend className="fieldset-legend">Get Started</legend>

        <label className="label">Email</label>
        <input className={`input w-full ${formik.errors.email && formik.touched.email ? "input-error" : ""}`} name="email" type="text" onChange={formik.handleChange} value={formik.values.email} placeholder="Email" />

        <button className="btn btn-neutral mt-4" type="submit">Continue</button>
      </form>
    </div>
  );
};
