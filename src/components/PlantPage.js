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
    // Make a POST request to add a new plant
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlantData),
    })
      .then((response) => response.json())
      .then((data) => {
        setPlants([...plants, data]); // Add the new plant to the list
      })
      .catch((error) => {
        console.error("Error adding plant: ", error);
      });
  };

  const handleSoldOut = (id) => {
    // Update the soldOut status for the plant with the given ID
    // Make a PUT request to update the plant
    // ...

    // Example:
    // const updatedPlants = plants.map((plant) =>
    //   plant.id === id ? { ...plant, soldOut: true } : plant
    // );
    // setPlants(updatedPlants);
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
