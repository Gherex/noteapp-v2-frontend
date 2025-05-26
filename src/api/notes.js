const BASE_URL = "http://localhost:8080/notes";

export const createNote = async (note) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });

  if (!res.ok) throw new Error("Error creating note");
  return res.json();
};

export const deleteNote = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Error deleting note");
};

export const updateNote = async (id, updatedNote) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedNote),
  });

  if (!res.ok) throw new Error("Error updating note");
  return res.json();
};

export const archiveNote = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}/archive`, {
    method: "PATCH",
  });

  if (!res.ok) throw new Error("Error archiving note");
};

export const unarchiveNote = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}/unarchive`, {
    method: "PATCH",
  });

  if (!res.ok) throw new Error("Error unarchiving note");
};
