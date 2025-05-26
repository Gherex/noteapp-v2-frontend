import { FaRegSave } from "react-icons/fa";
import { archiveNote } from "../../api/notes";

function ArchiveButton({ noteid, onActionComplete }) {
  const handleArchived = async () => {
    try {
      await archiveNote(noteid);
      console.log("Note successfully archived");
      if (onActionComplete) onActionComplete(); // 🔁 refresh
    } catch (error) {
      console.error("Error archiving note:", error);
      alert("Error archiving note");
    }
  };

  return (
    <button onClick={handleArchived} className="action-button">
      <FaRegSave />
    </button>
  );
}

export default ArchiveButton;
