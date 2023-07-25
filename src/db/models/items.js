import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

class Items extends Model {}

Items.init(
  {
    name: DataTypes.STRING,
    option_id: { type: DataTypes.BIGINT, defaultValue: 0 },
    price: DataTypes.BIGINT,
    type: { type: DataTypes.ENUM, values: ['COFFEE', 'JUICE', 'FOOD'] },
    amount: { type: DataTypes.BIGINT, defaultValue: 0 },
  },
  {
    sequelize,
    modelName: 'Items',
  },
);

export default Items;
