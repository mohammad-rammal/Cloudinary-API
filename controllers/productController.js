const {StatusCodes} = require('http-status-codes');
const Product = require('../models/Product');

const createProduct = async (req, res) => {
    try {
        // Create a new product with the provided image path
        const product = await Product.create(req.body);

        // Return the created product
        res.status(StatusCodes.CREATED).json({product});
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: 'Something went wrong'});
    }
};

const getAllProducts = async (req, res) => {
    const products = await Product.find({});

    res.status(StatusCodes.OK).json({products});
};

module.exports = {
    createProduct,
    getAllProducts,
};
