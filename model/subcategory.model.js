// models/Subcategory.js
import mongoose from 'mongoose';

const subcategorySchema = new mongoose.Schema({
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'subcategories',
    timestamps: false // manually handling `created_at`
});

const Subcategory = mongoose.model('Subcategory', subcategorySchema);
export default Subcategory;