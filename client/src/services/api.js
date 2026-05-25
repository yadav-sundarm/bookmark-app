import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});
export const fetchBookmarks = async () => {
  try {
    const response = await api.get("/bookmarks");
    return response.data;
  } catch (error) {
    console.log("Error fetching bookmarks : ", error.message);
    throw error;
  }
};

export const createBookmark = async (bookmarkData) => {
  try {
    const response = await api.post("/bookmarks", bookmarkData);
    return response.data;
  } catch (error) {
    console.log("Error creating Bookmark : ", error.message);
    throw error;
  }
};

export const deleteBookmark = async (id) => {
  try {
    await api.delete(`/bookmarks/${id}`);
  } catch (error) {
    console.log("Error deleting Bookmark : ", error.message);
    throw error;
  }
};

export const updateBookmark = async (id, updatedData) => {
  try {
    const response = await api.put(`/bookmarks/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.log("Error updating Bookmark : ", error.message);
    throw error;
  }
};
