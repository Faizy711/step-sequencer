const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/localuserlist",
  {
    useMongoClient: true
  }
);

const UserSeed = [
  {
    FirstName: "JIM",
    LastName: "BOB",
    Email: "example@gmail.com",
    Password: "TEST"
  },
];

db.User
  .remove({})
  .then(() => db.User.collection.insertMany(UserSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
