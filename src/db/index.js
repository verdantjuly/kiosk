import sequelize from './sequelize.js';
import Items from './models/items.js';
import Order_Items from './models/order_items.js';
import Relations from './relations/index.js';
import Item_Order_Customers from './models/item_order_customers.js';
import Order_Customers from './models/order_customers.js';
import Options from './models/options.js';

Object.values(Relations).forEach(relationsFunction => {
  relationsFunction();
});

export {
  sequelize,
  Items,
  Order_Items,
  Item_Order_Customers,
  Order_Customers,
  Options,
};
