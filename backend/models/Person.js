import mongoose from "mongoose";

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    minLength: 11,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
  },
});

personSchema.set("toJSON", {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id;
    delete returnObject._id;
    delete returnObject.__v;
  },
});

const Person = mongoose.model("Person", personSchema);

export default Person;
