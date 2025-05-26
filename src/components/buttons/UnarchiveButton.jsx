import { TbXboxX } from "react-icons/tb";
import { unarchiveNote } from "../../api/notes";

function UnarchiveButton({ noteid, onActionComplete }) {
  const handleUnarchived = async () => {
    try {
      await unarchiveNote(noteid);
      console.log("Note successfully unarchived");
      if (onActionComplete) onActionComplete(); // 🔁 refresh
    } catch (error) {
      console.error("Error unarchive note:", error);
      alert("Error unarchive note");
    }
  };

  return (
    <button onClick={handleUnarchived} className="action-button">
      <TbXboxX />
    </button>
  );
}

export default UnarchiveButton;
