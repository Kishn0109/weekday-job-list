import React, { useState } from "react";
import Filter from "./Filter";
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
const experiences = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const remoteOptions = ["In-office", "Hybrid", "Remote"];
const minBaseSalaryOption = [...new Array(7)].map(
  (_, index) => index + 10 + "L"
);
const roleOptions = ["Backend", "Frontend", "Flutter"];
export default function Filters() {
  const [roles, setRoles] = useState([]);
  const [remote, setRemote] = useState("");
  const [experience, setExperience] = useState("");
  const [minBaseSalary, setMinBaseSalary] = useState("");
  const [companyName, setCompanyName] = useState("");
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setCompanyName(value);
  };
  return (
    <div>
      <Filter
        options={roleOptions}
        label="Roles"
        value={roles}
        setValue={setRoles}
        multiple
        placeholder="Roles"
      />
      <Filter
        options={remoteOptions}
        label="Remote"
        value={remote}
        setValue={setRemote}
        placeholder="Remote"
      />
      <Filter
        options={experiences}
        label="Experience"
        value={experience}
        setValue={setExperience}
        placeholder="Experience"
      />
      <Filter
        options={minBaseSalaryOption}
        label="Min Base Pay"
        value={minBaseSalary}
        setValue={setMinBaseSalary}
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
