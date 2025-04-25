import { Button } from "@chakra-ui/react";
import {Route, Routes} from 'react-router-dom'

function App() {
  return (
    <>
      <Box minH={"100vh"}></Box>
      {/* Navbar */}
      <Routes>
        <Route path="/" element={<HomePage/>}>
      </Routes>
    </>
  );
}

export default App;
