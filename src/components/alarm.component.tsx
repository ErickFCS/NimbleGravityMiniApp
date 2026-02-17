

export const Alarm = ({ message, error }: { message?: string, error?: boolean }) => {

  // If not message then no alarm
  if (!message) return (<></>);

  return (
    <div role="alert" className={`alert ${error ? "alert-error" : "alert-success"} static m-3`}>
      {!error &&
        <svg className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>}
      {error &&
        <svg className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>}
      <span>{message}</span>
    </div>
  );
};
