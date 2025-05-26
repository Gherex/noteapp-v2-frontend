import CreateNoteForm from "../components/forms/CreateNoteForm";
import BackToHome from "../components/buttons/BackToHome";

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
