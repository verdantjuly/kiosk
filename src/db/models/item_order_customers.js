import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

class Item_Order_Customers extends Model {}

Item_Order_Customers.init(
  {
    item_id: DataTypes.BIGINT,
    order_customer_id: DataTypes.BIGINT,
    amount: DataTypes.BIGINT,
    option: DataTypes.JSON,
    price: DataTypes.BIGINT,
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
    modelName: 'Item_Order_Customers',
  },
);

export default Item_Order_Customers;
