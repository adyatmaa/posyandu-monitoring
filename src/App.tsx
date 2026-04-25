import { Toaster } from "sonner";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Index } from "./screen/Index";
import { Stunting } from "./screen/Stunting";

function App() {
  return (
    <>
      <Toaster richColors />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/stunting" element={<Stunting />} />
        </Routes>
      </BrowserRouter>

      {/* <Test /> */}
    </>
  );
}

export default App;
