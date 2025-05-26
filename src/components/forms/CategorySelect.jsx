function CategorySelect({ handleChange, formDataCategory, categories }) {
  return (
    <>
      <select
        id="category"
        name="category"
        value={formDataCategory}
        onChange={handleChange}
        required
      >
        <option value="">Select</option>
        {categories
          .slice()
          .sort((a, b) => {
            if (
              a.name.toLowerCase() === "otro" ||
              a.name.toLowerCase() === "other"
            )
              return 1;
            if (
              b.name.toLowerCase() === "otro" ||
              b.name.toLowerCase() === "other"
            )
              return -1;
            return a.name.localeCompare(b.name);
          })
          .map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
      </select>
    </>
  );
}

export default CategorySelect;
