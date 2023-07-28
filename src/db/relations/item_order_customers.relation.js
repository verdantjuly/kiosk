import Order_Customers from '../models/order_customers.js';
import Items from '../models/items.js';
import Item_Order_Customers from '../models/item_order_customers.js';

export default () => {
  Item_Order_Customers.belongsTo(Items, {
    targetKey: 'id',
    foreignKey: 'item_id',
  }),
    Item_Order_Customers.belongsTo(Order_Customers, {
      targetKey: 'id',
      foreignKey: 'order_customer_id',
    });
};
