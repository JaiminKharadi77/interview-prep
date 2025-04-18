"use client";
import ComponentList from "./Temp/ComponentList";
import { Provider } from "react-redux";
import store from "./store/store";

export default function Home() {
  return (
    <Provider store={store}>
      <div>
        <ComponentList />
      </div>
    </Provider>
  );
}
