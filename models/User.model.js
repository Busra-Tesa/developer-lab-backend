const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    lastname: {
      type: String,
      required: [true, "LastName is required."],
    },
    lastname: {
      type: String,
      required: [true, "Name is required."],
    },
    languages: {
      type: String,
      required: [true, "Languages is required."],
    },
    github: {
      type: String,
      required: [true, "GitHub is required."],
    },
    img: {
      type: String,
      required: [" Image is required."],
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
