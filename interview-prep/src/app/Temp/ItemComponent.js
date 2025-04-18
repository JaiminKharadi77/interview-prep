import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { toggleValue } from "../store/testSlice";
import axios from "axios";

const ItemComponent = ({ item }) => {
  const dispatch = useDispatch();

  const handleToggle = (id) => {
    // Toggle item value via API
    axios
      .post(`http://localhost:5000/toggle/${id}`)
      .then((response) => {
        dispatch(toggleValue(id));
      })
      .catch((error) => {
        console.error("Error toggling value:", error);
      });
  };

  console.log(item.id);
  return (
    <div key={item.id}>
      <span>{`Item ${item.id}: ${item.value}`}</span>
      <button onClick={() => handleToggle(item.id)} className="bg-red-200">
        Toggle
      </button>
    </div>
  );
};

export default memo(ItemComponent);
