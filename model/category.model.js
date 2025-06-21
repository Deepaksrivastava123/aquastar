// models/Category.js
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
}, {
    collection: 'categories', // 👈 Prevents pluralizing
    timestamps: false // 👈 You manually handle created_at
});

const Category = mongoose.model('Category', categorySchema);
export default Category;