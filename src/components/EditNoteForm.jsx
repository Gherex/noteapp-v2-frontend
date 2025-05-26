import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchNoteById, fetchAllCategories } from "../api/fetchNotes";
import { updateNote } from "../api/notes";
import UpdatedMessage from "./UpdatedMessage";
import ErrorMessage from "./ErrorMessage";

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

  // Load categories and current note
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
          category: noteData.category.id.toString(), // Match select value
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
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
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
    </div>
  );
}

export default EditNoteForm;
