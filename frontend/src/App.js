import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./Homepage/Navbar";
import { RandomBiasness } from "./Homepage/RandomBiasness";
import { MathExpression } from "./Homepage/MathExpression";
import { Debug } from "./Homepage/Debug";
import { Homepage } from "./Homepage/Homepage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
          <Route index element={<Homepage />} />
          <Route path="/random-biasness" element={<RandomBiasness />} />
          <Route path="/math-expression" element={<MathExpression />} />
          <Route path="/debug" element={<Debug />} />
        </Route>
    </Routes>
  );
}

export default App;
