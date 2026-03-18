const prisma = require('../utils/db');

const addOrderItems = async (req, res) => {
    const { orderItems, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400).json({ message: 'No order items' });
        return;
    } else {
        try {
            const order = await prisma.order.create({
                data: {
                    userId: req.user.id,
                    total: totalPrice,
                    items: {
                        create: orderItems.map((item) => ({
                            productId: item.productId,
                            quantity: item.quantity,
                            price: item.price,
                        })),
                    },
                },
                include: {
                    items: true
                }
            });

            res.status(201).json(order);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await prisma.order.findUnique({
            where: { id: parseInt(req.params.id) },
            include: {
                user: {
                    select: { name: true, email: true },
                },
                items: {
                    include: {
                        product: true
                    }
                },
            },
        });

        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMyOrders = async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            where: { userId: req.user.id },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                user: {
                    select: { id: true, name: true },
                },
            },
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addOrderItems,
    getOrderById,
    getMyOrders,
    getOrders,
};
