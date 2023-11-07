import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  people: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Person",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject._v;
    delete returnedObject.passwordHash;
  },
});

const User = mongoos.model("Person", personSchema);

export default User;
