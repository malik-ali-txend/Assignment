const express = require("express");
const {
  getAllResources,
  renderCreateForm,
  createResource,
  renderUpdateForm,
  updateResource,
  renderDeleteForm,
  deleteResource,
} = require("../controllers/resourceController");

const router = express.Router();

router.get("/", getAllResources);
router.get("/create", renderCreateForm);
router.post("/create", createResource);
router.get("/update/:id", renderUpdateForm);
router.post("/update/:id", updateResource);
router.get("/delete/:id", renderDeleteForm);
router.post("/delete/:id", deleteResource);

module.exports = router;
