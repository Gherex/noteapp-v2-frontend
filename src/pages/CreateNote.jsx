import BackToHome from "../components/BackToHome.jsx";
import CreateNoteForm from "../components/CreateNoteForm.jsx";

function CreateNote() {
  return (
    <div className="create-note-container">
      <h2>Create note</h2>
      <CreateNoteForm />
      <BackToHome />
    </div>
  );
}

export default CreateNote;
