const express = require("express");

const { getPersons, getPerson, createPerson, updatePerson, deletePerson } = require("../controllers/persons");

const router = express.Router();

router
  .route("/")
    .get(getPersons)
    .post(createPerson);  

router
  .route("/:id")
    .get(getPerson)
    .put(updatePerson)
    .delete(deletePerson);

module.exports = router;
