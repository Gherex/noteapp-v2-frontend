function ModalDeleteNote({ handleConfirmation, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Are you sure you want to delete this note?</h3>
        <div className="modal-buttons-container">
          <button
            className="menu-btn"
            onClick={() => {
              handleConfirmation();
              onClose();
            }}
          >
            Yes
          </button>
          <button className="menu-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalDeleteNote;
