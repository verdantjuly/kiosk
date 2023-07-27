import Order_Items from '../models/order_items.js';
import Items from '../models/items.js';

export default () => {
  Items.hasMany(Order_Items, {
    sourceKey: 'id',
    foreignKey: 'item_id',
  });
};
