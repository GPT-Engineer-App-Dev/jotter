import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Notes from "./pages/Notes.jsx";
import VoiceNotes from "./pages/VoiceNotes.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/notes" element={<Notes />} />
      <Route path="/voice-notes" element={<VoiceNotes />} />
      </Routes>
    </Router>
  );
}

export default App;
