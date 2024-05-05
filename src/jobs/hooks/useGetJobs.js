import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jobActions } from "../jobSlice";
import { useSearchParams } from "react-router-dom";
import { extractExistingParams } from "../../Filter";

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
export default function useGetJobs(offset = 0) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { jdList } = useSelector((state) => state.jobs);
  const searchParam = useSearchParams();
  const searchParams = extractExistingParams(searchParam[0]);
  const {
    experience: [minExp] = [""],
    companyName=[""],
    location,
    roles = [],
    minBaseSalary = [""],
  } = searchParams;
  const minJdSalary = Number(minBaseSalary[0].split("L")[0]);
  const jobRoles = roles.map((role) => role.toLowerCase());
  console.log(searchParams, companyName, "searchParam");
  const getJobs = () => {
    setIsLoading(true);
    const body = JSON.stringify({
      limit: 10,
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
      .then(({ jdList, totalCount }) => {
        dispatch(jobActions.add(jdList));
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

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
  useEffect(() => {
    getJobs();
  }, [offset]);
  return { jobs: jdList.filter(filterJobs), isLoading };
}
