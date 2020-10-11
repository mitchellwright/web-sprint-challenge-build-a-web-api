require("dotenv").config();
const express = require("express");
const projectsRouter = require("./projects/projectsRouter");

const server = express();
const port = process.env.PORT;

server.use(express.json());
server.use(projectsRouter);

server.get("/", (req, res) => {
  res.json({
    message: "we made it",
  });
});

server.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
