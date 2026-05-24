import mongoose from "mongoose";

const bookmarkScehms = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    url: {
      type: String,
      required: true,
    },
    tag: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Bookmark = mongoose.model("Bookmark", bookmarkScehms);

export default Bookmark;
