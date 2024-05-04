import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jobActions } from "../jobSlice";

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
export default function useGetJobs(offset = 0, params) {
  const dispatch = useDispatch();
  const { jdList } = useSelector((state) => state.jobs);
  const { minExp, companyName, location, jobRole, minJdSalary } = params;
  
  const getJobs = () => {
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
      .catch((error) => console.error(error));
  };

  const filterJobs = (jd) => {
    if (minExp && minExp > jd.minExp) return false;

    if (minJdSalary && minJdSalary > jd.minJdSalary) return false;

    if (
      companyName &&
      !jd.companyName.toLowerCase().includes(companyName.toLowerCase())
    )
      return false;

    if (location && !jd.location.toLowerCase().includes(location.toLowerCase()))
      return false;

    return true;
  };
  useEffect(() => {
    getJobs();
  }, [offset]);
  return jdList.filter(filterJobs);
}
