import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

class Order_Customers extends Model {}

Order_Customers.init(
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    state: { type: DataTypes.BOOLEAN, defaultValue: false },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Order_Customers',
  },
);

export default Order_Customers;
