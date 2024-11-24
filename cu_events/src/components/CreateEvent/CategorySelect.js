import React from 'react';

const CategorySelect = ({ categories, handleChange, selectedCategory }) => (
  <div className="mb-3">
    <label htmlFor="category_id" className="form-label">Category</label>
    <select
      id="category_id"
      name="category_id"
      className="form-select"
      onChange={handleChange}
      value={selectedCategory}
      required
    >
      <option value="">Select Category</option>
      {categories.map((category) => (
        <option key={category.category_id} value={category.category_id}>
          {category.category_name}
        </option>
      ))}
    </select>
  </div>
);

export default CategorySelect;
