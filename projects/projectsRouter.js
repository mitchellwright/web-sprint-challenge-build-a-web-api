const express = require("express");

const router = express.Router();

const projects = require("../data/helpers/projectModel");

router.get("/projects/:id", (req, res) => {
  projects
    .get(req.params.id)
    .then((project) => {
      res.json(project);
    })
    .catch((err) => {
      res.status(500).json({
        message: "There was an error retrieving this project.",
      });
    });
});

module.exports = router;
