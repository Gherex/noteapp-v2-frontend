import { useState, useEffect } from "react";
import { createNote, createCategory } from "../../api/notes";
import { fetchAllCategories } from "../../api/fetchNotes";
import SuccessMessage from "../messages/SuccessMessage";
import ErrorMessage from "../messages/ErrorMessage";
import { FaPlus } from "react-icons/fa";
import ModalNewCategory from "./ModalNewCategory";
import CategorySelect from "./CategorySelect";
import CircularProgress from "@mui/material/CircularProgress";

function CreateNoteForm() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  });

  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState("idle");
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoriesError, setCategoriesError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategoryInput, setNewCategoryInput] = useState("");
  const [modalError, setModalError] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchAllCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error loading categories:", error);
        setCategoriesError("Failed to load categories");
      } finally {
        setLoadingCategories(false);
      }
    };

    loadCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

    const newNote = {
      ...formData,
      category: selectedCategory,
    };

    try {
      await createNote(newNote);
      setStatus("success");
    } catch (error) {
      console.error("Error creating note:", error);
      setStatus("error");
    }
  };

  if (loadingCategories)
    return (
      <div className="margin-bottom">
        <CircularProgress />
      </div>
    );
  if (categoriesError)
    return (
      <div className="margin-bottom">
        Error loading categories. Please try again later.
      </div>
    );

  return (
    <div className="form-container">
      {status === "success" ? (
        <SuccessMessage />
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

          <button
            type="submit"
            className="menu-btn"
            disabled={categories.length === 0}
          >
            Create Note
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

export default CreateNoteForm;
