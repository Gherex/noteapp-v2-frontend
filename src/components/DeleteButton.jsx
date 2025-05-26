import { MdDeleteOutline } from "react-icons/md";
import { deleteNote } from "../api/notes";

function DeleteButton({ noteid, onActionComplete }) {
  const handleDelete = async () => {
    try {
      await deleteNote(noteid);
      console.log("Note successfully deleted");
      if (onActionComplete) onActionComplete(); // 🔁 refresh
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("Error deleting note");
    }
  };

  return (
    <button onClick={handleDelete}>
      <MdDeleteOutline />
    </button>
  );
}

export default DeleteButton;
