import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

mongoose.connect("mongodb://127.0.0.1:27017/recipeshare");

// Multer setup for images
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Recipe schema
const recipeSchema = new mongoose.Schema({
  title: String,
  description: String,
  ingredients: [String],
  instructions: [String],
  imageUrl: String,
  comments: [{ user: String, text: String }],
  ratings: [{ user: String, stars: Number }],
});
const Recipe = mongoose.model("Recipe", recipeSchema);

// ===== APIs =====

// 1. Create Recipe
app.post("/api/recipes", upload.single("image"), async (req, res) => {
  const recipe = new Recipe({
    title: req.body.title,
    description: req.body.description,
    ingredients: req.body.ingredients.split(","),
    instructions: req.body.instructions.split(","),
    imageUrl: req.file.path,
  });
  await recipe.save();
  res.json(recipe);
});

// 2. Get All Recipes
app.get("/api/recipes", async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

// 3. Get Single Recipe
app.get("/api/recipes/:id", async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  res.json(recipe);
});

// 4. Update Recipe
app.put("/api/recipes/:id", async (req, res) => {
  const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(recipe);
});

// 5. Delete Recipe
app.delete("/api/recipes/:id", async (req, res) => {
  await Recipe.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// 6. Post Comment
app.post("/api/recipes/:id/comments", async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  recipe.comments.push({ user: req.body.user, text: req.body.text });
  await recipe.save();
  res.json(recipe);
});

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
