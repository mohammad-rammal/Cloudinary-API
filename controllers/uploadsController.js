const path = require('path');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const uploadProductImageLocal = async (req, res) => {
    // console.log(req.files);

    if (!req.files) {
        throw new CustomError.BadRequestError('No File Uploaded!');
    }

    const productImage = req.files.image;

    if (!productImage.mimetype.startsWith('image')) {
        throw new CustomError.BadRequestError('Please Upload Image!');
    }

    const maxSize = 1000;
    if (productImage.size > maxSize) {
        throw new CustomError.BadRequestError('Big Size Image!');
    }

    const imagePath = path.join(__dirname, '../public/uploads/' + `${productImage.name}`);

    await productImage.mv(imagePath);

    return res.status(StatusCodes.OK).json({image: {src: `/uploads/${productImage.name}`}});
};

const uploadProductImage = async (req, res) => {
    try {

        const now = new Date();
        const timestamp = now.toISOString().replace(/[:.]/g, '-');
        const originalFilename = path.basename(req.files.image.name, path.extname(req.files.image.name));
        const customFilename = `${originalFilename}-${timestamp}`;


        
        const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
            public_id: customFilename, 
            use_filename: true,
            folder: 'file-upload',
        });

        fs.unlinkSync(req.files.image.tempFilePath);

        
        return res.status(StatusCodes.OK).json({image: {src: result.secure_url}});
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: 'Error uploading image'});
    }
};

module.exports = {
    uploadProductImage,
};
