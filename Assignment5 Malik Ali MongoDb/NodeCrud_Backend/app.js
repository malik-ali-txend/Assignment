const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const productRoutes = require("./routes/resourceRoutes");

const app = express();
const port = 3000;

// MongoDB connection
const uri =
  "mongodb+srv://malikali:SgM52x50mTJIkZaS@cluster0.7zhmj.mongodb.net/resources?retryWrites=true&w=majority";
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("MongoDB connection failed:", err));

// Middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", productRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
