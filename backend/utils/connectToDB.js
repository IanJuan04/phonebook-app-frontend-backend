import mongoose from "mongoose";

// to indicate a unused function put an "_"
export default function connectToDB(url) {
  mongoose.connect(url).then((_res) => console.log("Connectd to DataBase"));
}
