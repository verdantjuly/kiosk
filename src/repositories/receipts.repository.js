import Order_Customers from '../db/models/order_customers.js';
import Item_Order_Customers from '../db/models/item_order_customers.js';
import Items from '../db/models/items.js';

class ReceiptsRepository {
  buy = async () => {
    const item = await Order_Customers.create({});
    return item;
  };

  order = async (order_customer_id, item_id, amount, option, price) => {
    const order = await Item_Order_Customers.create({
      order_customer_id,
      item_id,
      amount,
      option,
      price,
    });
    return order;
  };
  finditem = async item_id => {
    const finditem = await Items.findByPk(item_id);
    return finditem;
  };
}
export default ReceiptsRepository;
