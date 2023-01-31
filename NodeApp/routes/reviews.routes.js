/*
 * Author: Ahmed Hassan, Mayank Chetan Parvatia
 */

const express = require('express');
const router = express.Router();

// Import Middlewares
const {
    authenticateToken
} = require("../middleware/userMiddleware");

//Import service/controller
const reviewsService = require('./../services/reviews.service');

// Add new review
router.post('/addreview',
    [authenticateToken],
    reviewsService.createReview
);
router.post('/getreviews',
    [authenticateToken],
    reviewsService.getAllReviews
);
module.exports = router;