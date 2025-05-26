import BackToHome from "../components/BackToHome.jsx";
import EditNoteForm from "../components/EditNoteForm.jsx";

function EditNote() {
  return (
    <div className="create-note-container">
      <h2>Edit note</h2>
      <EditNoteForm />
      <BackToHome />
    </div>
  );
}

export default EditNote;
