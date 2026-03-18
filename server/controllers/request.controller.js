const prisma = require('../utils/db');

// @desc    Create a new custom request (BidBoard post)
// @route   POST /api/requests
// @access  Private
const createRequest = async (req, res, next) => {
    try {
        const {
            title,
            description,
            category,
            budgetRange,
            customBudgetMin,
            customBudgetMax,
            urgency,
            images,
        } = req.body;

        // Ensure we hook it to the correct user. 
        // Fallback to user ID 1 or a generic error if protect middleware isn't present
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Not authorized, no user found' });
        }

        const request = await prisma.request.create({
            data: {
                title,
                description,
                category,
                budgetRange: budgetRange || 'custom',
                customBudgetMin: customBudgetMin ? parseFloat(customBudgetMin) : null,
                customBudgetMax: customBudgetMax ? parseFloat(customBudgetMax) : null,
                urgency: urgency || 'normal',
                images: images || [],
                buyerId: req.user.id,
            },
            include: {
                buyer: { select: { name: true, email: true } }
            }
        });

        res.status(201).json(request);
    } catch (error) {
        next(error);
    }
};

// @desc    Get all requests
// @route   GET /api/requests
// @access  Public
const getRequests = async (req, res, next) => {
    try {
        const requests = await prisma.request.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                buyer: {
                    select: { name: true, email: true },
                },
            },
        });
        res.json(requests);
    } catch (error) {
        next(error);
    }
};

// @desc    Get logged in user requests
// @route   GET /api/requests/myrequests
// @access  Private
const getUserRequests = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Not authorized, no user found' });
        }

        const requests = await prisma.request.findMany({
            where: { buyerId: req.user.id },
            orderBy: { createdAt: 'desc' },
            include: { 
                offers: true,
                buyer: { select: { name: true, email: true } }
            },
        });
        res.json(requests);
    } catch (error) {
        next(error);
    }
};

// @desc    Get request by ID
// @route   GET /api/requests/:id
// @access  Public
const getRequestById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid request ID' });
        }

        const request = await prisma.request.findUnique({
            where: { id },
            include: { 
                buyer: { select: { name: true, email: true } },
                offers: true
            },
        });

        if (request) {
            res.json(request);
        } else {
            res.status(404);
            throw new Error('Request not found');
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createRequest,
    getRequests,
    getUserRequests,
    getRequestById,
};
