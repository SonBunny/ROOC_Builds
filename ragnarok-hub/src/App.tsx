import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ClassPage from "./pages/ClassPage";
import EventsPage from "./pages/EventsPage";
import BuildTypesPage from "./pages/BuildTypesPage";
import BuildDetail from "./pages/BuildDetail";
import Navigation from "./components/Navigation";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/class/:classId" element={<ClassPage />} />
        <Route path="/class/:classId/:category" element={<EventsPage />} />
        <Route path="/class/:classId/:category/:event" element={<BuildTypesPage />} />
        <Route path="/build/:buildId" element={<BuildDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;