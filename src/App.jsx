import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateNote from "./pages/CreateNote";
import ActiveNotes from "./pages/ActiveNotes";
import ArchivedNotes from "./pages/ArchivedNotes";
import EditNote from "./pages/EditNote";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateNote />} />
        <Route path="/active" element={<ActiveNotes />} />
        <Route path="/archived" element={<ArchivedNotes />} />
        <Route path="/edit/:id" element={<EditNote />} />
      </Routes>
    </Router>
  );
}

export default App;
