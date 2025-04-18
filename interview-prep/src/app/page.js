// app/page.js (or app/page.tsx)
import ComponentList from "./Temp/ComponentList";
import ReduxProvider from "./store/ReduxProvider";
import axios from "axios";

export default async function Home() {
  const res = await axios.get("http://localhost:5000/");
  const data = res.data;

  return (
    <ReduxProvider preloadedState={{ test: data }}>
      <ComponentList />
    </ReduxProvider>
  );
}
