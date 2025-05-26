function ModalNewCategory({
  newCategoryInput,
  setNewCategoryInput,
  handleNewCategory,
  modalError,
  onClose,
}) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>New Category</h3>
        <input
          type="text"
          placeholder="Enter category name"
          value={newCategoryInput}
          onChange={(e) => setNewCategoryInput(e.target.value)}
        />
        {modalError && (
          <div style={{ color: "red", marginBottom: "10px" }}>{modalError}</div>
        )}
        <div className="modal-buttons-container">
          <button className="menu-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="menu-btn" onClick={handleNewCategory}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalNewCategory;
