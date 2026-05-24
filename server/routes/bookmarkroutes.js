import express from "express";
import Bookmark from "../models/bookmark.js";
const routes = express.Router();

routes.post("/bookmarks", async (req, res) => {
  try {
    const bookmark = await Bookmark.create(req.body);
    res.status(201).send(bookmark);
  } catch (error) {
    res.status(500).send("Error adding bookmark");
  }
});

routes.get("/bookmarks", async (req, res) => {
  try {
    const bookmarks = await Bookmark.find();
    res.status(200).send(bookmarks);
  } catch (error) {
    res.status(500).send("Error fetching bookmarks");
  }
});

routes.delete("/bookmarks/:id", async (req, res) => {
  try {
    const bookmark = await Bookmark.findByIdAndDelete(req.params.id);
    if (!bookmark) {
      return res.status(404).send("Bookmark not found");
    }
    res.status(200).send("Bookmark deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting bookmark");
  }
});

routes.put("/bookmarks/:id", async (req, res) => {
  try {
    const bookmark = await Bookmark.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!bookmark) {
      return res.status(404).send("Bookmark not found");
    }
    res.status(200).send(bookmark);
  } catch (error) {
    res.status(500).send("Error updating bookmark");
  }
});

export default routes;
