import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Subcategory from './subcategory.model.js';

const Product = sequelize.define('Product', {
    subcategory_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Subcategory,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    name: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    image_url: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'products',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

// Associations
Subcategory.hasMany(Product, { foreignKey: 'subcategory_id' });
Product.belongsTo(Subcategory, { foreignKey: 'subcategory_id' });

export default Product;