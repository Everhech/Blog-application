//Initiate the variable
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//Create the schema
const userSchema = new mongoose.Schema(
  {
    //This is an object that contain all the configuration
    firstName: {
      required: [true, "First name is required"],
      type: String,
    },
    lastName: {
      required: [true, "Last name is required"],
      type: String,
    },
    profilePhoto: {
      type: String,
      default: "https://www.flaticon.es/icono-gratis/usuario_1946429",
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    bio: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    postCount: {
      type: Number,
      default: 0,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["Admin", "Guest", "Blogger"],
    },
    isFollowing: {
      type: Boolean,
      default: false,
    },
    isUnFollowing: {
      type: Boolean,
      default: false,
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
    AccountVerificationToken: String,
    AccountVerificationTokenExpires: Date,
    viewedBy: {
      //This is for referencing accounts with IDs of users
      type: [
        {
          type: mongoose.Schema.Types.ObjectId, //This isn't an object, it's like a virtual property
          ref: "User",
        },
      ],
    }, //This is an association
    followers: {
      // This is for reference accounts about users that follow them
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    following: {
      // This is for reference accounts about users that have a lot of following
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      //This is if the user is active in the app
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

//Hash password
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
//Compile Schema into model
const User = mongoose.model("User", userSchema);
module.exports = User;
