import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

class Options extends Model {}

Options.init(
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    extra_price: { type: DataTypes.BIGINT, defaultValue: 0 },
    shot_price: { type: DataTypes.BIGINT, defaultValue: 0 },
    hot: { type: DataTypes.BOOLEAN, defaultValue: false },
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
    modelName: 'Options',
  },
);

export default Options;
