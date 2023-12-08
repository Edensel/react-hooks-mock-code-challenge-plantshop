import React from "react";

function PlantCard({ plant, onSoldOut }) {
  const { id, name, image, price, soldOut } = plant;

  const handleSoldOut = () => {
    onSoldOut(id);
  };

  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {soldOut ? (
        <button className="primary">Sold Out</button>
      ) : (
        <button onClick={handleSoldOut}>Mark as Sold Out</button>
      )}
    </li>
  );
}

export default PlantCard;
