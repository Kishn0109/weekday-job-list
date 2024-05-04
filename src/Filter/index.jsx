import React, { useState } from "react";
import Filter from "./Filter";
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { useSearchParams } from "react-router-dom";
const experiences = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const remoteOptions = ["In-office", "Hybrid", "Remote"];
const minBaseSalaryOption = [...new Array(7)].map(
  (_, index) => index + 10 + "L"
);
const roleOptions = ["Backend", "Frontend", "Flutter"];
export function extractExistingParams(searchParams) {
  const entries = Array.from(searchParams.entries());
  return entries.reduce(
    (acc, a) => ((acc[a[0]] = acc[a[0]] || []).push(a[1]), acc),
    {}
  );
}
export default function Filters() {
  let [searchParams, setSearchParams] = useSearchParams();
  const params = extractExistingParams(searchParams);
  const [roles, setRoles] = useState(params.roles || []);
  const [remote, setRemote] = useState(params.remote || "");
  const [experience, setExperience] = useState(params.experience || "");
  const [minBaseSalary, setMinBaseSalary] = useState(
    params.minBaseSalary || ""
  );
  const [companyName, setCompanyName] = useState(params.companyName || "");
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setCompanyName(value);
    setParam("companyName", value);
  };
  const setParam = (key, value) => {
    setSearchParams({
      ...params,
      [key]: value,
    });
  };
  return (
    <div>
      <Filter
        options={roleOptions}
        label="Roles"
        value={roles}
        setValue={(value) => {
          setRoles(value);
          setParam("roles", value);
        }}
        multiple
        placeholder="Roles"
      />
      <Filter
        options={remoteOptions}
        label="Remote"
        value={remote}
        setValue={(value) => {
          setRemote(value);
          setParam("remote", value);
        }}
        placeholder="Remote"
      />
      <Filter
        options={experiences}
        label="Experience"
        value={experience}
        setValue={(value) => {
          setExperience(value);
          setParam("experience", value);
        }}
        placeholder="Experience"
      />
      <Filter
        options={minBaseSalaryOption}
        label="Min Base Pay"
        value={minBaseSalary}
        setValue={(value) => {
          setMinBaseSalary(value);
          setParam("minBaseSalary", value);
        }}
        placeholder="Min Base Pay"
      />
      <FormControl sx={{ m: 1, width: 150 }}>
        <InputLabel id="company-name-label">Company Name</InputLabel>
        <OutlinedInput
          id="company-name"
          label={"Company Name"}
          value={companyName}
          onChange={onChange}
        />
      </FormControl>
    </div>
  );
}
