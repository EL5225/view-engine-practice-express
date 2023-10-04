import express from "express";
import "dotenv/config.js";
import { pool } from "./externals/postgres.js";

const { PORT } = process.env;

const app = express();

app.use(express.urlencoded());
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("welcome");
});

app.get("/posts", async (req, res) => {
  const result = await pool.query("SELECT * FROM posts");
  res.render("getAllPosts", { posts: result.rows });
});

app.get("/posts/new", (req, res) => {
  res.render("newPost");
});

app.post("/posts", async (req, res) => {
  const { title, body } = req.body;
  await pool.query("INSERT INTO posts (title, body) VALUES ($1, $2)", [
    title,
    body,
  ]);
  res.redirect("/posts");
});

app.listen(PORT, () =>
  console.log(`Listening on port http://localhost:${PORT}`)
);
