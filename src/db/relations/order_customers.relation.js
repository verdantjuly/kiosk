import Order_Customers from '../models/order_customers.js';
import Item_Order_Customers from '../models/item_order_customers.js';

export default () => {
  Order_Customers.hasMany(Item_Order_Customers, {
    sourceKey: 'id',
    foreignKey: 'order_customer_id',
  });
};
