import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

class Order_Items extends Model {}

Order_Items.init(
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    item_id: DataTypes.BIGINT,
    amount: { type: DataTypes.BIGINT, defaultValue: 0 },
    state: { type: DataTypes.BIGINT, defaultValue: 0 },
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
    modelName: 'Order_Items',
  },
);

export default Order_Items;
