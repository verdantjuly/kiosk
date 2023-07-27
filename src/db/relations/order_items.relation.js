import Order_Items from '../models/order_items.js';
import Items from '../models/items.js';

export default () => {
  Order_Items.belongsTo(Items, {
    targetKey: 'id',
    foreignKey: 'item_id',
  });
};
