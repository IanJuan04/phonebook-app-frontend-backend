import User from "../models/.js";
import bcrypt from "bcrypt";

function getUsers() {
  return User.find({}).then((user) => user);
}

async function createUser({ username, name, password }) {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  return User.create({
    username,
    name,
    passwordHash,
  }).then;
}

export default {
  createUser,
};
