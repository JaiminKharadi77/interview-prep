// Temp/ComponentList.js
"use client";
import { useSelector } from "react-redux";
import ItemComponent from "./ItemComponent";

function ComponentList() {
  const items = useSelector((state) => state.test);

  return (
    <div>
      {items.map((item) => (
        <ItemComponent key={item.id} item={item} />
      ))}
    </div>
  );
}

export default ComponentList;
