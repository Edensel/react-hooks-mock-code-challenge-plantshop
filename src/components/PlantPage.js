import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((data) => {
        setPlants(data);
      })
      .catch((error) => {
        console.error("Error fetching plants: ", error);
      });
  }, []);

  const handleAddPlant = (newPlantData) => {
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlantData),
    })
      .then((response) => response.json())
      .then((data) => {
        setPlants([...plants, data]);
      })
      .catch((error) => {
        console.error("Error adding plant: ", error);
      });
  };

  const handleSoldOut = (id) => {
    const updatedPlants = plants.map((plant) =>
      plant.id === id ? { ...plant, soldOut: true } : plant
    );

    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ soldOut: true }),
    })
      .then(() => {
        setPlants(updatedPlants);
      })
      .catch((error) => {
        console.error("Error updating sold out status: ", error);
      });
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search onSearch={handleSearch} />
      <PlantList plants={filteredPlants} onSoldOut={handleSoldOut} />
    </main>
  );
}

export default PlantPage;
