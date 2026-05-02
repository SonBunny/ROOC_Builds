import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ClassPage from "./pages/ClassPage";
import CategoryPage from "./pages/CategoryPage";
import EventPage from "./pages/EventPage";
import BuildTypePage from "./pages/BuildTypePage";
import BuildDetail from "./pages/BuildDetail";
import Navigation from "./components/Navigation";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/class/:classId" element={<ClassPage />} />
        <Route path="/class/:classId/:category" element={<CategoryPage />} />
        <Route path="/class/:classId/:category/:event" element={<EventPage />} />
        <Route path="/class/:classId/:category/:event/:buildType" element={<BuildTypePage />} />
        <Route path="/build/:buildId" element={<BuildDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;