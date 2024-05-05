import React, { useEffect, useRef, useState } from "react";
import useGetJobs from "./hooks/useGetJobs";
import NotFoundImage from "../assets/nothing-found.png";
import {
  Box,
  Button,
  CardActions,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import useScroll from "./hooks/useScroll";

// const Item = styled(Box)(({ theme }) => ({
//   padding: theme.spacing(1),
//   textAlign: "center",
//   flexGrow: 1,
//   marginLeft:"auto",
//   marginRight:"auto",
//   marginTop:"auto"
// }));

export default function Jobs() {
  const [offset, setOffset] = useState(0);

  const { jobs, isLoading } = useGetJobs(offset);
  const elementRef = useRef(null);
  const threshold = 80; // Set your threshold value here
  const scrollPercentage = useScroll(elementRef, threshold);
  const limit = 12;

  useEffect(() => {
    if (scrollPercentage >= threshold) {
      setOffset((state) => state + 10);
    }
  }, [scrollPercentage]);

  if (isLoading && !jobs?.length) {
    return (
      <Stack
        spacing={{ xs: 2, sm: 5 }}
        direction="column"
        useFlexGap
        flexWrap="wrap"
        alignItems={"center"}
        justifyContent={"center"}
        flex={1}
      >
        {" "}
        <CircularProgress />
      </Stack>
    );
  }
  if (!jobs?.length) {
    return (
      <Stack
        spacing={{ xs: 2, sm: 5 }}
        direction="column"
        useFlexGap
        flexWrap="wrap"
        alignItems={"center"}
        justifyContent={"center"}
        flex={1}
      >
        <div>
          <img
            src={NotFoundImage}
            alt="not found"
            loading="lazy"
            style={{ width: "100px" }}
          />
        </div>
        <Typography variant="subtitle2">
          No Jobs available for this category at the moment
        </Typography>
      </Stack>
    );
  }
  return (
    <Box
      flex={1}
      minHeight={0}
      ref={elementRef}
      sx={{ overflowY: "auto" }}
      paddingY={10}
      paddingX={0}
    >
      <Container xs="sm">
        <Grid
          container
          columnSpacing={{ xs: 1, sm: 2 }}
          rowSpacing={{ xs: 1, sm: 2 }}
          sx={{
            paddingX: 2,
          }}
        >
          {jobs.map((job) => (
            <Grid item xs={6} sm={4} id={job.jdUid} padding={2}>
              <Card sx={{ height: "100%" }} variant="outlined" color="neutral">
                <CardContent sx={{ height: "100%" }}>
                  <Stack direction={"column"} height={"100%"}>
                    <Box flex={1}>
                      <Stack direction={"row"} gap={2}>
                        <img
                          height={44}
                          width={44}
                          src={job.logoUrl}
                          alt="logo"
                        />
                        <Box>
                          <Typography variant="subtitle2">
                            {job.companyName}
                          </Typography>
                          <Typography variant="subtitle1">
                            {job.jobRole}
                          </Typography>
                          <Typography variant="body2">
                            {job.location}
                          </Typography>
                        </Box>
                      </Stack>
                      <Stack direction={"row"}>
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
                          <Typography variant="h6">
                            Minimum Experience
                          </Typography>
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
          {isLoading && (
            <Grid
              item
              xs={12}
              padding={2}
              display={"flex"}
              justifyContent={"center"}
            >
              <CircularProgress />
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
