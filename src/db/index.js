import sequelize from './sequelize.js';
import Items from './models/items.js';
import Order_Items from './models/order_items.js';
import Relations from './relations/index.js';

Object.values(Relations).forEach(relationsFunction => {
  relationsFunction();
});

export { sequelize, Items, Order_Items };
