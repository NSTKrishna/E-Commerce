const express = require('express');
const { createRequest, getRequests, getUserRequests, getRequestById } = require('../controllers/request.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.route('/')
    .get(getRequests)
    .post(protect, createRequest);

router.route('/myrequests')
    .get(protect, getUserRequests);

router.route('/:id')
    .get(getRequestById);

module.exports = router;
