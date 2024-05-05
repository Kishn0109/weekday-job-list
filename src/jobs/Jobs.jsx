import React, { useEffect, useRef, useState } from "react";
import useGetJobs from "./hooks/useGetJobs";
import NotFoundImage from "../assets/nothing-found.png";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import useIntersectionObserver from "./hooks/useIntersectionObserver";
import Chunk from "./Chunk";

export default function Jobs() {
  const [offset, setOffset] = useState(0);
  // state which take care of how many jobs should render on the Ui
  const [activeChunk, setActiveChunk] = useState([0, 1]);

  // A hook which return jobs isLoading and list of all the jobs in chunks to keep smooth infinite loading
  const { jobs, isLoading, chunks } = useGetJobs(offset,setActiveChunk);

  // Ref's for Infinite scroll 
  const elementRef = useRef(null);

  // return IsActive true when element comes in the dom
  const [loaderRef, isActive] = useIntersectionObserver({
    root: elementRef.current,
  });

  // When ever loader element come in Ui fetch the data 
  useEffect(() => {
    if (isActive) {
      setOffset((state) => state + 12); 
    }
  }, [isActive]);


  // Show Loader when first time fetch the jobs
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

  // show Result not found if job does not match
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
        <Box>
          <img
            src={NotFoundImage}
            alt="not found"
            loading="lazy"
            style={{ width: "100px" }}
          />
        </Box>
        <Typography variant="subtitle2">
          No Jobs available for this category at the moment
        </Typography>
      </Stack>
    );
  }

  // List of jobs 
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
          {chunks.map((jobs, index) =>
            activeChunk.includes(index) ? (
              <Chunk
                jobs={jobs}
                key={index}
                index={index}
                root={elementRef.current}
                setActiveChunk={setActiveChunk}
              />
            ) : null
          )}
          <Grid
            item
            xs={12}
            padding={2}
            display={"flex"}
            justifyContent={"center"}
            ref={loaderRef}
          >
            {isLoading && <CircularProgress />}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
