import { useState, useEffect } from "react";
import { createNote } from "../api/notes";
import { fetchAllCategories } from "../api/fetchNotes";
import SuccessMessage from "./SuccessMessage";
import ErrorMessage from "./ErrorMessage";

function CreateNoteForm() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  });

  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | success | error
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoriesError, setCategoriesError] = useState(null);

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
    setFormData({
      ...formData,
      [name]: value,
    });
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

  if (loadingCategories) {
    return <div>Loading categories...</div>;
  }

  if (categoriesError) {
    return <div>Error loading categories. Please try again later.</div>;
  }

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
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                disabled={categories.length === 0}
              >
                <option value="">Select</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {categories.length === 0 && (
                <p className="error-message">No categories available</p>
              )}
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

          <button
            type="submit"
            className="menu-btn"
            disabled={categories.length === 0}
          >
            Create Note
          </button>
        </form>
      )}
    </div>
  );
}

export default CreateNoteForm;
