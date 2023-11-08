import app from "./app.js";
import config from "./utils/config.js";

app.get("/", (_req, res) => res.send("Hello, World!"));

app.listen(config.PORT, () => {
  console.log(`Server is now running on port ${config.PORT}`);
});
