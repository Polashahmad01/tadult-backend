const mongoose = require("mongoose");

const PersonSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name input field can't be blank."]
  },
  lastName: {
    type: String,
    required: [true, "Last Name input field can't be blank."]
  },
  dateOfBirth: {
    type: Date,
    default: null
  },
  userName: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "Username input field can't be blank."]
  },
  accountType: {
    // Array of Strings
    type: [String],
    required: true,
    enum: [
      "User",
      "Content-Creator"  
    ]
  },
  _id: {
    type: String,
    required: [true, "_id can't be blank."]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Person", PersonSchema);
