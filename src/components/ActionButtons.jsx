import EditButton from "./EditButton.jsx";
import ArchiveButton from "./ArchiveButton.jsx";
import DeleteButton from "./DeleteButton.jsx";
import UnarchiveButton from "./UnarchiveButton.jsx";

function ActionButtons({ noteid, isArchived, onActionComplete }) {
  return (
    <div className="action-buttons">
      {isArchived ? (
        <>
          <EditButton noteid={noteid} />
          <UnarchiveButton
            noteid={noteid}
            onActionComplete={onActionComplete}
          />
        </>
      ) : (
        <>
          <EditButton noteid={noteid} />
          <ArchiveButton noteid={noteid} onActionComplete={onActionComplete} />
          <DeleteButton noteid={noteid} onActionComplete={onActionComplete} />
        </>
      )}
    </div>
  );
}

export default ActionButtons;
