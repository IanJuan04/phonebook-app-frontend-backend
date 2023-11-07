import userService from "../services/userService";

function createUser(req, res) {
  const body = req.body;

  userService
    .createUser(body)
    .then((savedUser) => res.status(201).json(savedUser))
    .catch((error) => next(error));
}

export default {
  createUser,
};
