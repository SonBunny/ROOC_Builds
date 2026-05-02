import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ClassPage from "./pages/ClassPage";
import SubclassPage from "./pages/SubClassPage";
import ModePage from "./pages/ModePage";
import BuildDetail from "./pages/BuildDetail";
import BuildList from "./pages/BuildList";
import Navigation from "./components/Navigation";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/class/:classId" element={<ClassPage />} />
        <Route path="/subclass/:id" element={<SubclassPage />} />
        <Route path="/mode/:id/:category" element={<ModePage />} />
        <Route path="/build/:buildId" element={<BuildDetail />} />
        <Route
          path="/builds/:subclass/:category/:mode"
          element={<BuildList />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;