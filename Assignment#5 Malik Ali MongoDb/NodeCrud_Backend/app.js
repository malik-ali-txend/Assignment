// for express & mongoose
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Product = require("./models/products.models");
const app = express();
const port = 3000;

const uri =
  "mongodb+srv://malikali:SgM52x50mTJIkZaS@cluster0.7zhmj.mongodb.net/resources?retryWrites=true&w=majority";
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("MongoDB connection failed:", err));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", async (req, res) => {
  try {
    const resources = await Product.find();
    res.render("index", { resources });
  } catch (error) {
    res.status(500).send("Error loading resources: " + error.message);
  }
});

app.get("/create", (req, res) => {
  res.render("create");
});

app.get("/update/:id", async (req, res) => {
  try {
    const resource = await Product.findById(req.params.id);
    if (!resource) {
      return res.status(404).send("Resource not found");
    }
    res.render("update", { resource });
  } catch (error) {
    res.status(500).send("Error fetching resource: " + error.message);
  }
});

app.get("/delete/:id", async (req, res) => {
  try {
    const resource = await Product.findById(req.params.id);
    if (!resource) {
      return res.status(404).send("Resource not found");
    }
    res.render("delete", { resource });
  } catch (error) {
    res.status(500).send("Error fetching resource: " + error.message);
  }
});

app.post("/create", async (req, res) => {
  try {
    const newResource = new Product(req.body);
    await newResource.save();
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error creating resource: " + error.message);
  }
});

app.post("/update/:id", async (req, res) => {
  try {
    const updatedResource = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedResource) {
      return res.status(404).send("Resource not found");
    }
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error updating resource: " + error.message);
  }
});

app.post("/delete/:id", async (req, res) => {
  try {
    const deletedResource = await Product.findByIdAndDelete(req.params.id);
    if (!deletedResource) {
      return res.status(404).send("Resource not found");
    }
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error deleting resource: " + error.message);
  }
});

// // API Route for testing with tools like Insomnia/Postman
// app.post("/api/products", async (req, res) => {
//   try {
//     const product = await Product.create(req.body);
//     res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// Start Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
