import "./App.css";
import Jobs from "./jobs/Jobs";
import Filters from "./Filter";
import { Container } from "@mui/material";
function App() {
  return (
    <Container maxWidth="xl">
      <Filters />
      <Jobs />
    </Container>
  );
}

export default App;
