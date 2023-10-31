import mongoose from "mongoose";

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://juanadrianpaul:${password}@cluster0.rjnjn9l.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

// Create and save objects
const person = new Person({
  name: "Adrian Juan",
  number: "09123456789",
});

person.save().then((result) => {
  console.log("person saved!");
  mongoose.connection.close();
});

//Fetch objects from database = GET all
Person.find({}).then((result) => {
  result.forEach((person) => {
    console.log(person);
  });
  mongoose.connection.close();
});

// Fetch single object from database = GET :id
Person.findById("6540f19a5b5ebc55fbc5a999").then((result) => {
  console.log(result);
  mongoose.connection.close();
});

// //Delete single object from database = GET :id
Person.findByIdAndDelete("6540f35330c7ae95f3a59338").then((result) => {
  console.log("Person has been deleted");
  mongoose.connection.close();
});
