const prisma = require('../utils/db');

const getProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: parseInt(req.params.id) },
        });
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createProduct = async (req, res) => {
    const { name, description, price, stock, imageUrl } = req.body;
    try {
        const product = await prisma.product.create({
            data: {
                name,
                description,
                price,
                stock,
                imageUrl,
            },
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProduct = async (req, res) => {
    const { name, description, price, stock, imageUrl } = req.body;
    try {
        const product = await prisma.product.update({
            where: { id: parseInt(req.params.id) },
            data: {
                name,
                description,
                price,
                stock,
                imageUrl,
            },
        });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        await prisma.product.delete({
            where: { id: parseInt(req.params.id) },
        });
        res.json({ message: 'Product removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
