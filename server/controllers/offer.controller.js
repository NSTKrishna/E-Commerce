const prisma = require('../utils/db');

// @desc    Create a new offer for a specific request
// @route   POST /api/offers
// @access  Private
const createOffer = async (req, res, next) => {
    try {
        const { requestId, price, message, deliveryDays } = req.body;

        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Not authorized, no user found' });
        }

        // According to our schema, a seller can only bid once per request.
        // Prisma will handle this with the @@unique map, but checking manually is safer for friendly UX.
        const reqId = parseInt(requestId);

        const existingOffer = await prisma.offer.findUnique({
            where: {
                requestId_sellerId: {
                    requestId: reqId,
                    sellerId: req.user.id,
                }
            }
        });

        if (existingOffer) {
            return res.status(400).json({ message: 'You have already submitted an offer for this request.' });
        }

        const offer = await prisma.offer.create({
            data: {
                requestId: reqId,
                sellerId: req.user.id,
                price: parseFloat(price),
                message,
                deliveryDays: deliveryDays ? parseInt(deliveryDays) : null,
            },
        });

        res.status(201).json(offer);
    } catch (error) {
        next(error);
    }
};

// @desc    Get logged in seller's offers
// @route   GET /api/offers/myoffers
// @access  Private
const getSellerOffers = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Not authorized, no user found' });
        }

        const offers = await prisma.offer.findMany({
            where: { sellerId: req.user.id },
            orderBy: { createdAt: 'desc' },
            include: {
                request: {
                    select: { 
                        title: true, 
                        budgetRange: true, 
                        status: true,
                        buyer: { select: { name: true, email: true } }
                    }
                },
            },
        });
        res.json(offers);
    } catch (error) {
        next(error);
    }
};

// @desc    Get offers submitted to a specific request 
// @route   GET /api/offers/request/:requestId
// @access  Private (Typically for the Buyer to view incoming bids)
const getOffersByRequest = async (req, res, next) => {
    try {
        const requestId = parseInt(req.params.requestId);

        const offers = await prisma.offer.findMany({
            where: { requestId },
            orderBy: { createdAt: 'desc' },
            include: {
                seller: { select: { name: true, email: true } },
            },
        });
        res.json(offers);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createOffer,
    getSellerOffers,
    getOffersByRequest,
};
