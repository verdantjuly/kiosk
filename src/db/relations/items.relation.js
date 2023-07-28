import Order_Items from '../models/order_items.js';
import Items from '../models/items.js';
import Item_Order_Customers from '../models/item_order_customers.js';
import Options from '../models/options.js';

export default () => {
  Items.hasMany(Order_Items, {
    sourceKey: 'id',
    foreignKey: 'item_id',
  }),
    Items.hasMany(Item_Order_Customers, {
      sourceKey: 'id',
      foreignKey: 'item_id',
    }),
    Items.belongsTo(Options, {
      targetKey: 'id',
      foreignKey: 'option_id',
    });
};
