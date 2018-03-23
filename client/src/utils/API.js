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
  }
};
