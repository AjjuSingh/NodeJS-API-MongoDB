// Model schema
const Bootcamp = require('../models/Bootcamp')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')

/**
 * @desc Get all bootcamps
 * @route GET /api/v1/bootcamps
 * @access Public
 */
exports.getBootcamps = asyncHandler(async (req, res, next) => {

    const allBootcamps = await Bootcamp.find()
    res.status(200).json({ success: true, count: allBootcamps.length, data: allBootcamps })

})


/**
 * @desc Get specific bootcamps
 * @route GET /api/v1/bootcamps/:id
 * @access Public
 */
exports.getBootcamp = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamp.findById(req.params.id)
    if (!bootcamp) {
        next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
    }
    res.status(200).json({ success: true, data: bootcamp })
})

/**
 * @desc Create new bootcamp
 * @route POST /api/v1/bootcamps
 * @access Public
 */
exports.createBootcamp = asyncHandler(async (req, res, next) => {


    const createdBootcamp = await Bootcamp.create(req.body)
        .then((data) => console.log('Created bootcamp successfully'.green.bold))
    res.status(201).json({
        success: true,
        data: createdBootcamp,
    })
})


/**
 * @desc Update bootcamp
 * @route PUT /api/v1/bootcamps/:id
 * @access Private
 */
exports.updateBootcamp = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    if (!bootcamp) {
        res.status(400).json({ success: false, data: bootcamp })
    }
    res.status(200).json({ success: true, data: bootcamp })
})

/**
 * @desc Delete bootcamp
 * @route POST /api/v1/bootcamps/:id
 * @access Private
 */
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
    if (!bootcamp) {
        res.status(400).json({ success: false, data: bootcamp })
    }
    res.status(200).json({ success: true, data: bootcamp })
})