import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Category from './category.model.js';

const Subcategory = sequelize.define('Subcategory', {
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'subcategories',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

// Associations
Category.hasMany(Subcategory, { foreignKey: 'category_id' });
Subcategory.belongsTo(Category, { foreignKey: 'category_id' });

export default Subcategory;