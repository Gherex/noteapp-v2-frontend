import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchNoteById, fetchAllCategories } from "../../api/fetchNotes";
import { updateNote, createCategory } from "../../api/notes";
import UpdatedMessage from "../messages/UpdatedMessage";
import ErrorMessage from "../messages/ErrorMessage";
import { FaPlus } from "react-icons/fa";
import ModalNewCategory from "./ModalNewCategory";
import CategorySelect from "./CategorySelect";

function EditNoteForm() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  });
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState("idle");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategoryInput, setNewCategoryInput] = useState("");
  const [modalError, setModalError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesData, noteData] = await Promise.all([
          fetchAllCategories(),
          fetchNoteById(id),
        ]);
        setCategories(categoriesData);
        setFormData({
          title: noteData.title,
          content: noteData.content,
          category: noteData.category.id.toString(),
        });
      } catch (err) {
        setError("Failed to load note or categories.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNewCategory = async () => {
    const input = newCategoryInput.trim();
    if (!input) return;

    const normalized = input.toLowerCase();
    const existing = categories.find(
      (cat) => cat.name.toLowerCase() === normalized
    );

    if (existing) {
      setFormData((prev) => ({ ...prev, category: existing.id }));
      setIsModalOpen(false);
      setNewCategoryInput("");
      return;
    }

    const formattedName =
      input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();

    try {
      const newCategory = await createCategory({ name: formattedName });
      setCategories((prev) => [...prev, newCategory]);
      setFormData((prev) => ({ ...prev, category: newCategory.id }));
      setIsModalOpen(false);
      setNewCategoryInput("");
    } catch (error) {
      console.error("Error creating category:", error);
      setModalError("Failed to create category");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedCategory = categories.find(
      (cat) => cat.id === parseInt(formData.category)
    );

    const updatedNote = {
      id,
      title: formData.title,
      content: formData.content,
      category: selectedCategory,
    };

    try {
      await updateNote(id, updatedNote);
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="form-container">
      {status === "success" ? (
        <UpdatedMessage />
      ) : status === "error" ? (
        <ErrorMessage />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="title-category-container">
            <div className="label-container">
              <label htmlFor="title">Title: </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="label-container">
              <label htmlFor="category">Category: </label>
              <CategorySelect
                formDataCategory={formData.category}
                handleChange={handleChange}
                categories={categories}
              />
              <button
                type="button"
                className="add-category-button"
                onClick={() => {
                  setIsModalOpen(true);
                  setModalError("");
                }}
                title="Add new category"
              >
                <FaPlus />
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="content"></label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              placeholder="Write something here..."
              onChange={handleChange}
              required
              rows={8}
              style={{ width: "100%", minHeight: "150px" }}
            />
          </div>

          <button type="submit" className="menu-btn">
            Update Note
          </button>
        </form>
      )}

      {/* Modal */}
      {isModalOpen && (
        <ModalNewCategory
          newCategoryInput={newCategoryInput}
          setNewCategoryInput={setNewCategoryInput}
          handleNewCategory={handleNewCategory}
          modalError={modalError}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default EditNoteForm;
