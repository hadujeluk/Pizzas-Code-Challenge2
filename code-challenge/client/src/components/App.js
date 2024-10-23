import { Routes, Route } from "react-router-dom"; // Updated import statement
import Home from "./Home";
import Navbar from "./Navbar";
import Restaurant from "./Restaurant";

function App() {
  return (
    <>
      <Navbar />
      <Routes> {/* Changed Switch to Routes */}
        <Route path="/restaurants/:id" element={<Restaurant />} /> {/* Updated route syntax */}
        <Route path="/" element={<Home />} /> 
      </Routes>
    </>
  );
}

export default App;
