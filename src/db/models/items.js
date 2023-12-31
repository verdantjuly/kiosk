import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

class Items extends Model {}

Items.init(
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    name: DataTypes.STRING,
    option_id: DataTypes.BIGINT,
    price: DataTypes.BIGINT,
    type: { type: DataTypes.ENUM, values: ['COFFEE', 'JUICE', 'FOOD'] },
    amount: { type: DataTypes.BIGINT, defaultValue: 0 },
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
    modelName: 'Items',
  },
);

export default Items;
