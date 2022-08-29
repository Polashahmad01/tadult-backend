const Person = require("../models/Person");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/error-response");

// @desc    Get all persons
// @route   GET /api/v1/persons
// @access  Public
exports.getPersons = asyncHandler( async (req, res, next) => {
//   const persons = await Person.find();

  // Query
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };
  
  // Fields to exclude
  const removeFields = ['select'];

  // Loop over removeFields and remove them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, $lt, $lte, $in)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Finding resource
  query = Person.find(JSON.parse(queryStr));

  // Select fields
  if(req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Executing query
  const persons = await query;
  
  res.status(200).json({ success: true, count: persons.length, data: persons });
});

// @desc    Create new person
// @route   POST /api/v1/persons
// @access  Public
exports.createPerson = asyncHandler( async(req, res, next) => {
  const person = await Person.create(req.body);

  res.status(201).json({ success: true, data: person });
});

// @desc    Get single person
// @route   GET /api/v1/persons
// @access  Public
exports.getPerson = asyncHandler( async(req, res, next) => {
  const person = await Person.findById(req.params.id);

  if(!person) {
    return next(new ErrorResponse(`No person found with the id of ${req.params.id}`, 404));
  }

  res.status(200).json({ success: true, data: person });
});

// @desc    Update person
// @route   PUT /api/v1/persons
// @access  Private
exports.updatePerson = asyncHandler( async(req, res, next) => {
  let person = await Person.findById(req.params.id);

  if(!person) {
    return next(new ErrorResponse(`No person found with the id of ${req.params.id}`, 404));
  }

  person = await Person.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: person });
});

// @desc    Delete person
// @route   DELETE /api/v1/persons
// @access  Private
exports.deletePerson = asyncHandler( async(req, res, next) => {
  const person = await Person.findById(req.params.id);
  
  if(!person) {
    return next(new ErrorResponse(`Person is not found with the id of ${req.params.id}`, 404))
  }

  await person.remove();

  res.status(200).json({ success: true, data: { } });
});
