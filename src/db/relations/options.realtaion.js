import Options from '../models/options.js';
import Items from '../models/items.js';

export default () => {
  Options.hasMany(Items, {
    sourceKey: 'id',
    foreignKey: 'option_id',
  });
};
