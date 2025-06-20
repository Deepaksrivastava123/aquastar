import dotenv from 'dotenv';
import { express, authRoutes, profileRoutes, categoryRoutes, subCategoryRoutes, sequelize } from './utils/import.js';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/subcategory', subCategoryRoutes);

// Start the server
const startServer = async() => {
    try {
        await sequelize.authenticate();
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`🚀 Server running at http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('❌ DB connection failed:', err.message);
    }
};

startServer();