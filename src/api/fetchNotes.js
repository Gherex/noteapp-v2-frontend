const BASE_URL = "http://localhost:8080/notes";

export const fetchAllNotes = () =>
  fetch(`${BASE_URL}`).then((res) => res.json());

export const fetchNoteById = (id) =>
  fetch(`${BASE_URL}/${id}`).then((res) => res.json());

export const fetchActiveNotes = async () => {
  const response = await fetch(`${BASE_URL}/active`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

export const fetchArchivedNotes = async () => {
  const response = await fetch(`${BASE_URL}/archived`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

export const fetchActiveNotesByCategory = async (category) => {
  const response = await fetch(
    `${BASE_URL}/active?category=${encodeURIComponent(category)}`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

export const fetchArchivedNotesByCategory = async (category) => {
  const response = await fetch(
    `${BASE_URL}/archived?category=${encodeURIComponent(category)}`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

export const fetchAllCategories = async () => {
  const response = await fetch(`${BASE_URL}/categories`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};
