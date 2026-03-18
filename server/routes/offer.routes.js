const express = require('express');
const { createOffer, getSellerOffers, getOffersByRequest } = require('../controllers/offer.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.route('/')
    .post(protect, createOffer);

router.route('/myoffers')
    .get(protect, getSellerOffers);

router.route('/request/:requestId')
    .get(protect, getOffersByRequest);

module.exports = router;
