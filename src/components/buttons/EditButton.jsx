import { LuPencil } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

function EditButton({ noteid }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit/${noteid}`);
  };

  return (
    <button onClick={handleEdit} className="action-button">
      <LuPencil />
    </button>
  );
}

export default EditButton;
