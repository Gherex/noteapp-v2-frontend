import BackToHome from "../components/BackToHome.jsx";
import ActionButtons from "../components/ActionButtons.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchArchivedNotes } from "../api/fetchNotes.js";
import useFetch from "../hooks/useFetch.js";

function ArchiveNotes() {
  const { data: notes, loading, error, refetch } = useFetch(fetchArchivedNotes);

  if (loading) return <CircularProgress />;
  if (error) return <p>⚠️ Error loading notes. Tap to retry.</p>;

  return (
    <div className="archived-notes-container">
      <h2>Archived Notes</h2>
      <div className="notes-container">
        {notes && notes.length > 0 ? (
          notes.map((note) => (
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
                onActionComplete={refetch}
              />
            </div>
          ))
        ) : (
          <p>All clear! No archived notes found.</p>
        )}
      </div>
      <BackToHome />
    </div>
  );
}

export default ArchiveNotes;
