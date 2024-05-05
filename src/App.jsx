import "./App.css";
import Jobs from "./jobs/Jobs";
import Filters from "./Filter";
import { Box, Container, Stack } from "@mui/material";
function App() {
  return (
    <Stack height={"100vh"} border={2}>
      <Container xs="">
        <Filters />
      </Container>
      <Jobs />
    </Stack>
  );
}

export default App;
