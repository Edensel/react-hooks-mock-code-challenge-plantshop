import React, { useState } from "react";

function NewPlantForm({ onAddPlant }) {
  const [newPlantData, setNewPlantData] = useState({
    name: "",
    image: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPlantData({ ...newPlantData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlant(newPlantData);
    setNewPlantData({ name: "", image: "", price: "" });
  };

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Plant name"
          value={newPlantData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={newPlantData.image}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
          value={newPlantData.price}
          onChange={handleChange}
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
