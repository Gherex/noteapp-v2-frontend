import { MdDeleteOutline } from "react-icons/md";
import { useState } from "react";
import ModalDeleteNote from "../messages/ModalDeleteNote";
import { deleteNote } from "../../api/notes";

function DeleteButton({ noteid, onActionComplete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteNote(noteid);
      if (onActionComplete) onActionComplete();
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("Error deleting note");
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <button onClick={() => setIsModalOpen(true)} className="action-button">
        <MdDeleteOutline />
      </button>

      {isModalOpen && (
        <ModalDeleteNote
          handleConfirmation={handleDelete}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

export default DeleteButton;
