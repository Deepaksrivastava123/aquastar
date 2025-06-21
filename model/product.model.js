// models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    subcategory_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory',
        required: true
    },
    name: {
        type: String,
        required: true,
        maxlength: 150
    },
    description: {
        type: String
    },
    price: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    quantity: {
        type: Number,
        default: 0
    },
    image_url: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'products',
    timestamps: false // disable updatedAt and createdAt; manually using created_at
});

const Product = mongoose.model('Product', productSchema);
export default Product;