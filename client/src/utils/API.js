import axios from "axios";

export default {
  // Gets all books
  getSamples: function() {
    return axios.get("/api/samples");
  },
  // Gets the book with the given id
  getSamples: function(id) {
    return axios.get("/api/samples/" + id);
  },
  // Deletes the book with the given id
  deleteSamples: function(id) {
    return axios.delete("/api/samples/" + id);
  },
  // Saves a book to the database
  saveSample: function(sampleData) {
    return axios.post("/api/samples", sampleData);
  },

   // Gets all books
  getUsers: function() {
    return axios.get("/api/users");
  },
  // Gets the book with the given id
  getUsers: function(id) {
    return axios.get("/api/users/" + id);
  },
  // Deletes the book with the given id
  deleteUsers: function(id) {
    return axios.delete("/api/users/" + id);
  },
  // Saves a book to the database
  saveUsers: function(userData) {
    return axios.post("/api/users", userData);
  }
};
