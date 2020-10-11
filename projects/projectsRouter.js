const express = require("express");

const router = express.Router();

const projects = require("../data/helpers/projectModel");

// get project by id
router.get("/projects/:id", validateProjectId, (req, res) => {
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

// create project
router.post("/projects", validateProjectData, (req, res) => {
  projects
    .insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error creating project. Please try again.",
      });
    });
});

// update project by ID
router.put(
  "/projects/:id",
  validateProjectId,
  validateProjectData,
  (req, res) => {
    projects
      .update(req.params.id, req.body)
      .then((project) => {
        res.json(project);
      })
      .catch((err) => {
        res.status(500).json({
          message: "Error updating project. Please try again.",
        });
      });
  }
);

router.delete("/projects/:id", validateProjectId, (req, res) => {
  projects
    .remove(req.params.id)
    .then((project) => {
      res.json({
        message: "Project successfully deleted.",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error deleting project. Please try again.",
      });
    });
});

// ***** Custom Middlewares ******

// checks to make sure that a project with the given ID exists
function validateProjectId(req, res, next) {
  projects
    .get(req.params.id)
    .then((project) => {
      if (project) {
        req.project = project;
        next();
      } else {
        res.status(404).json({
          message: `No project with ID of ${req.params.id} can be found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: `There was an error retrieving the project with ID ${req.params.id}.`,
      });
    });
}

// checks to make sure that the required fields are present to create or update a project
function validateProjectData(req, res, next) {
  if (!req.body.name || !req.body.description) {
    res.status(400).json({
      message: "Missing name or description data.",
    });
  } else {
    next();
  }
}

module.exports = router;
