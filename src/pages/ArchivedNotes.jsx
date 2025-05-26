import { useState, useEffect } from "react";
import {
  fetchArchivedNotes,
  fetchArchivedNotesByCategory,
} from "../api/fetchNotes.js";
import CategoryFilter from "../components/forms/CategoryFilter.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import BackToHome from "../components/buttons/BackToHome.jsx";
import ActionButtons from "../components/buttons/ActionButtons.jsx";

function ArchiveNotes() {
  const [notes, setNotes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const notesData = selectedCategory
          ? await fetchArchivedNotesByCategory(selectedCategory)
          : await fetchArchivedNotes();
        setNotes(notesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [selectedCategory]);

  const handleNoteAction = async () => {
    try {
      const notesData = selectedCategory
        ? await fetchArchivedNotesByCategory(selectedCategory)
        : await fetchArchivedNotes();
      setNotes(notesData);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <CircularProgress />;
  if (error)
    return (
      <div className="archived-notes-container">
        <p className="center-text">⚠️ Error loading notes. Tap to retry.</p>
        <BackToHome />
      </div>
    );

  return (
    <div className="archived-notes-container">
      <h2>Archived Notes</h2>
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div className="notes-container">
        {notes.length > 0 ? (
          [...notes].reverse().map((note) => (
            <div className="notes-buttons-container" key={note.id}>
              <div className="note-card">
                <div className="title-category-container">
                  <h3>{note.title}</h3>
                  <p>
                    <strong>Category:</strong> {note.category.name}
                  </p>
                </div>
                <p className="note-content">{note.content}</p>
                <p className="timestamp">
                  <strong>Created:</strong>{" "}
                  {new Date(note.createdAt).toLocaleString()}
                </p>
                <p className="timestamp">
                  <strong>Updated:</strong>{" "}
                  {new Date(note.updatedAt).toLocaleString()}
                </p>
              </div>
              <ActionButtons
                noteid={note.id}
                isArchived={true}
                onActionComplete={handleNoteAction}
              />
            </div>
          ))
        ) : (
          <p className="center-text">
            {selectedCategory
              ? `No archived notes found in ${selectedCategory} category`
              : "All clear! No archived notes found."}
          </p>
        )}
      </div>

      <BackToHome />
    </div>
  );
}

export default ArchiveNotes;
