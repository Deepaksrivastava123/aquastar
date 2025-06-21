// index.js or app.js
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { express, authRoutes, profileRoutes, categoryRoutes, subCategoryRoutes } from './utils/import.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/subcategory', subCategoryRoutes);

// Start server with MongoDB connection
const startServer = async() => {
    try {
        await connectDB(); // ✅ Use Mongo connection
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`🚀 Server running at http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('❌ Failed to start server:', err.message);
    }
};

startServer();