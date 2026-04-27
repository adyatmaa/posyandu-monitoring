import { Toaster } from "sonner";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Index } from "./screen/Index";
import { Stunting } from "./screen/Stunting";
import { Imunisasi } from "./screen/Imunisasi";
import { Article } from "./screen/Article";
import { Layout } from "./screen/Layout";

function App() {
  return (
    <>
      <Toaster richColors />
      <BrowserRouter>
        <div className="grow">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="stunting" element={<Stunting />} />
              <Route path="imunisasi" element={<Imunisasi />} />
              <Route path="article" element={<Article />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
