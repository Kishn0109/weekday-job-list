import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jobActions } from "../jobSlice";
import { useSearchParams } from "react-router-dom";
import { extractExistingParams } from "../../Filter";

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
export default function useGetJobs(offset = 0, setActiveChunk) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { jdList } = useSelector((state) => state.jobs);
  const searchParam = useSearchParams();
  const searchParams = extractExistingParams(searchParam[0]);

  // show number of job's per page
  const limit = 12;

  // filter's Applied by user
  const {
    experience: [minExp] = [""],
    companyName = [""],
    location,
    roles = [],
    minBaseSalary = [""],
  } = searchParams;
  const minJdSalary = Number(minBaseSalary[0].split("L")[0]);
  const jobRoles = roles.map((role) => role.toLowerCase());

  useEffect(() => {
    setActiveChunk([0, 1]);
  }, [companyName[0]]);

  const filterJobs = (jd) => {
    if (minExp && minExp < jd.minExp) return false;

    if (minJdSalary && minJdSalary > jd.minJdSalary) return false;

    if (
      companyName[0] &&
      !jd.companyName.toLowerCase().includes(companyName[0].toLowerCase())
    )
      return false;
    if (jobRoles.length && !jobRoles.includes(jd.jobRole.toLowerCase()))
      return false;

    if (location && !jd.location.toLowerCase().includes(location.toLowerCase()))
      return false;

    return true;
  };

  // fetch and store jobs when offset get changes
  useEffect(() => {
    const getJobs = () => {
      setIsLoading(true);
      const body = JSON.stringify({
        limit: limit,
        offset: offset,
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body,
      };
      fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        requestOptions
      )
        .then((response) => response.json())
        .then(({ jdList }) => {
          dispatch(jobActions.add(jdList));
        })
        .catch((error) => console.error(error))
        .finally(() => setIsLoading(false));
    }
    getJobs();
  }, [offset]);


  // Job Chunks
  const filteredJob = jdList.filter(filterJobs);

  // calculating how much chunk can be created for all the job's
  const chunkCount = Math.ceil(filteredJob.length / limit);
  const jobChunks = [...new Array(chunkCount)].map((_, idx) => {
    const st = idx * limit;
    const end = (idx + 1) * limit;
    return end > filteredJob.length
      ? filteredJob.slice(st)
      : filteredJob.slice(st, end);
  });
  return { jobs: filteredJob, chunks: jobChunks, isLoading };
}
