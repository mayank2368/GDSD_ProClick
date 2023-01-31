/*
 * Author: Ahmed Hassan
 */

const express = require('express');
const router = express.Router();

// Import Middlewares
const {
    authenticateToken
} = require("../middleware/userMiddleware");

//Import service/controller
const salesService = require('./../services/sales.service');

// Add new review
router.post('/addsale',
    [authenticateToken],
    salesService.createSale
);

module.exports = router;