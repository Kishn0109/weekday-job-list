import React, { useState } from "react";
import useGetJobs from "./hooks/useGetJobs";
import { Button } from "@mui/material";

export default function Jobs() {
  const [offset, setOffset] = useState(0);
  const jobs = useGetJobs(offset, {
    minExp: null,
    companyName: "eBay",
    location: "mumbai",
    jobRole: "",
    minJdSalary: "",
  });
  return (
    <div> 
      <Button
        onClick={() => setOffset((state) => state + 10)}
        variant="contained"
      >
        Load data
      </Button>
    </div>
  );
}
