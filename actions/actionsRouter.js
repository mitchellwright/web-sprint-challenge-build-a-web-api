const express = require("express");

const router = express.Router();

const actions = require("../data/helpers/actionModel");

// get all actions
router.get("/actions", (req, res) => {
  actions
    .get()
    .then((action) => {
      res.json(action);
    })
    .catch((err) => {
      res.status(500).json({
        message: "There was an error retrieving this action.",
      });
    });
});

// get action by id
router.get("/actions/:id", validateActionId, (req, res) => {
  actions
    .get(req.params.id)
    .then((action) => {
      res.json(action);
    })
    .catch((err) => {
      res.status(500).json({
        message: "There was an error retrieving this action.",
      });
    });
});

// create action
router.post("/actions", validateActionData, (req, res) => {
  actions
    .insert(req.body)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error creating action. Please try again.",
      });
    });
});

// update action by ID
router.put("/actions/:id", validateActionId, validateActionData, (req, res) => {
  actions
    .update(req.params.id, req.body)
    .then((action) => {
      res.json(action);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error updating action. Please try again.",
      });
    });
});

router.delete("/actions/:id", validateActionId, (req, res) => {
  actions
    .remove(req.params.id)
    .then((action) => {
      res.json({
        message: "Action successfully deleted.",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error deleting action. Please try again.",
      });
    });
});

// ***** Custom Middlewares ******

// checks to make sure that a project with the given ID exists
function validateActionId(req, res, next) {
  actions
    .get(req.params.id)
    .then((action) => {
      if (action) {
        req.action = action;
        next();
      } else {
        res.status(404).json({
          message: `No action with ID of ${req.params.id} can be found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: `There was an error retrieving the action with ID ${req.params.id}.`,
      });
    });
}

// checks to make sure that the required fields are present to create or update a project
function validateActionData(req, res, next) {
  if (!req.body.notes || !req.body.description || !req.body.project_id) {
    res.status(400).json({
      message: "Missing name description, or project ID data.",
    });
  } else {
    next();
  }
}

module.exports = router;
