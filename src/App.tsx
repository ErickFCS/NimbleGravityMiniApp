import { Alarm } from "./components/alarm.component";
import { Form } from "./components/form.component";
import { JobEntry } from "./components/jobEntry.component";
import { getCandidateData, getJobPositions, submitJobApplication } from "./services/jobHunt.service";
import { AlarmObj } from "./types/alarm.type";
import { Candidate } from "./types/candidate.type";
import { JobPosition } from "./types/jobPosition.type";
import { useEffect, useState } from "react";


function App() {
  const [email, setEmail] = useState("");
  const [candidate, setCandidate] = useState<Candidate | undefined>(undefined);
  const [jobPositions, setJobPositions] = useState<JobPosition[]>([]);
  const [alarms, setAlarms] = useState<AlarmObj[]>([]);

  // emulates a queue, simple and useful for small work
  const createAlert = (message: string, isError?: boolean) => {
    setAlarms((prev) => prev.concat({ isError, message } as AlarmObj));
    setTimeout(() => {
      setAlarms((prev) => prev.slice(1, undefined));
    }, 3000);
  };

  // handles the email email entry
  const handleContinue = async (email: string) => {
    setEmail(email);
    createAlert("Email saved");
    console.log("Here")
    // retry 3 times the request
    for (let i = 0; i < 3; i++) {
      try {
        const candidateFetched = await getCandidateData(email);
        setCandidate(candidateFetched.data);
        // breaks on success
        break;
      } catch (error) {
        console.error(error);
        // On the failed last try it triggers an alarm
        if (i === 3 - 1) {
          createAlert("Invalid email or bad connection", true);
          setEmail("");
        }
      }
    }
  };

  // handle the submision on a job position
  const handleSubmit = async (jobApplicationId: string, githubURL: string) => {
    if (!candidate) return createAlert("You need a candidate", true);
    // retry 3 times the request
    for (let i = 0; i < 3; i++) {
      try {
        await submitJobApplication({
          canditateId: candidate.candidateId,
          jobId: jobApplicationId,
          repoUrl: githubURL,
          uuid: candidate.uuid
        });
        createAlert("Job application sent successfully");
        // breaks on success
        break;
      } catch (error) {
        console.error(error);
        // On the failed last try it triggers an alarm
        if (i === 3 - 1) {
          createAlert("Unable to send job application", true);
        }
      }
    }
  };

  useEffect(() => {
    // track if the component is still mounted
    let isMounted = true

    /* 
     * tries to fetch the job positions while the component is mounted
     * and retries again after 5000ms if failed undefinetly untill
     * success or component unmount
     */
    const repeatOnFail = () => {
      getJobPositions().then((jobPositions) => {
        setJobPositions(jobPositions.data);
      }).catch((reason) => {
        console.error(reason);
        if (!isMounted) return
        setTimeout(repeatOnFail, 5000);
      });
    };

    repeatOnFail();

    // unmount function, runs on component unmount
    return () => { isMounted = false }
  }, []);

  return (
    <>
      {alarms.map((e, i) =>
        <Alarm key={`alarm-${i}`} message={e.message} error={e.isError} />)}
      {!jobPositions.length && candidate &&
        <Alarm message="Unable to get Job positions" error={true} />}
      {!email &&
        <Form continueHandler={handleContinue} />}
      {candidate &&
        jobPositions.map((e, i) =>
          <JobEntry key={`job-entry-${i}`} jobPosition={e} submitHadler={handleSubmit} />)}
    </>
  );
}

export default App;
