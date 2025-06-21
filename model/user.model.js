// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    mobile: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
}, {
    collection: 'user', // 👈 Equivalent to freezeTableName
    timestamps: false, // 👈 Matching Sequelize's timestamps: false
});

const User = mongoose.model('User', userSchema);
export default User;