import React, { useEffect } from "react";

import {
  Box,
  Button,
  CardActions,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import useIntersectionObserver from "./hooks/useIntersectionObserver";

// A Function which return all the job's in form of chunks
export default function Chunk({ jobs, setActiveChunk, index, root }) {

  // a start divider of a Job Chunk 
  const [chunkEndDivider, isEndActive] = useIntersectionObserver({
    root: root,
  });
  // a end divider of a Job Chunk 
  const [chunkStartDivider, isStartActive] = useIntersectionObserver({
    root: root,
  });

  // when it reach to end of the chunk divider add show next jobs chunk
  useEffect(() => {
    if (index > 0 && isEndActive) {
      setActiveChunk([index, index + 1]);
    }
  }, [isEndActive]);

  // when it reach to end of the chunk divider add show previous jobs chunk
  useEffect(() => {
    if (index > 0 && isStartActive) {
      setActiveChunk([index - 1, index]);
    }
  }, [isStartActive]);
  return (
    <>
      <Grid item xs={12} height={0} ref={chunkStartDivider}></Grid>
      {jobs.map((job,index) => (
        <Grid item xs={6} sm={4} id={job.jdUid} padding={2} key={index}>
          <Card sx={{ height: "100%" }} variant="outlined" color="neutral">
            <CardContent sx={{ height: "100%" }}>
              <Stack direction={"column"} height={"100%"}>
                <Box flex={1}>
                  <Stack direction={"row"} gap={2}>
                    <img height={44} width={44} src={job.logoUrl} alt="logo" />
                    <Box>
                      <Typography variant="subtitle2">
                        {job.companyName}
                      </Typography>
                      <Typography variant="subtitle1">{job.jobRole}</Typography>
                      <Typography variant="body2">{job.location}</Typography>
                    </Box>
                  </Stack>
                  <Stack direction={"row"} alignItems={"center"}>
                    <Typography>Estimated Salary:</Typography>
                    {job.minJdSalary && job.minJdSalary}
                    {job.minJdSalary && job.maxJdSalary && " - "}
                    {job.maxJdSalary && job.maxJdSalary} LPA
                  </Stack>
                  <Typography variant="h5">About Company</Typography>
                  <Typography variant="subtitle2">
                    {job.jobDetailsFromCompany}
                  </Typography>
                  {job.minExp && (
                    <>
                      <Typography variant="h6">Minimum Experience</Typography>
                      <Typography variant="subtitle2">
                        {job.minExp} years
                      </Typography>
                    </>
                  )}
                </Box>
                <CardActions>
                  <Button
                    variant="contained"
                    sx={{ width: "100%", marginTop: 4 }}
                  >
                    Easy Apply
                  </Button>
                </CardActions>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
      <Grid item xs={12} height={0} ref={chunkEndDivider}></Grid>
    </>
  );
}
