import express from "express";
import cors from "cors";
const app = express();
const port = 5000;

// Use CORS middleware
app.use(cors());

// In-memory data store
let data = [
  { id: 1, value: false },
  { id: 2, value: false },
  { id: 3, value: true },
  { id: 4, value: false },
  { id: 5, value: true },
];

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Endpoint to toggle the value
app.post("/toggle/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = data.find((obj) => obj.id === id);

  if (item) {
    item.value = !item.value;
    res.status(200).json({ message: "Value toggled", item });
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

app.get("/", (req, res) => {
  res.json(data);
});
