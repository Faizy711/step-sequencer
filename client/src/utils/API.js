import axios from "axios";

export default {
   // Gets all books
  getUser: function() {
    return axios.get("/api/user");
  },
  // Gets the book with the given id
  getUserId: function(id) {
    return axios.get("/api/user/" + id);
  },
  // Deletes the book with the given id
  deleteUser: function(id) {
    return axios.delete("/api/user/" + id);
  },
  // Saves a book to the database
  saveUser: function(userData) {
    console.log("in saveUser axios");
    console.log(userData);
    return axios.post("/api/user", userData);
  }
};
