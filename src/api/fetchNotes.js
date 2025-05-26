const BASE_URL = "http://localhost:8080/notes";

export const fetchAllNotes = () =>
  fetch(`${BASE_URL}`).then((res) => res.json());

export const fetchNoteById = (id) =>
  fetch(`${BASE_URL}/${id}`).then((res) => res.json());

export const fetchActiveNotes = () =>
  fetch(`${BASE_URL}/active`).then((res) => res.json());

export const fetchArchivedNotes = () =>
  fetch(`${BASE_URL}/archived`).then((res) => res.json());

export const fetchActiveNotesByCategory = (category) =>
  fetch(`${BASE_URL}/active?category=${encodeURIComponent(category)}`).then(
    (res) => res.json()
  );

export const fetchArchivedNotesByCategory = (category) =>
  fetch(`${BASE_URL}/archived?category=${encodeURIComponent(category)}`).then(
    (res) => res.json()
  );

export const fetchAllCategories = () =>
  fetch(`${BASE_URL}/categories`).then((res) => res.json());
