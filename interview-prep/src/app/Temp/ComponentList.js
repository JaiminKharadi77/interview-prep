import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ItemComponent from "./ItemComponent";
import { addItems, toggleValue } from "../store/testSlice";
import axios from "axios";

function ComponentList() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.test);

  useEffect(() => {
    // Fetch data from the API and update Redux state
    axios
      .get("http://localhost:5000/")
      .then((response) => {
        dispatch(addItems(response.data));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [dispatch]);

  return (
    <div>
      {items.map((item) => (
        <ItemComponent key={item.id} item={item} />
      ))}
    </div>
  );
}

export default ComponentList;
