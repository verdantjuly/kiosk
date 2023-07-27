import Order_Items from '../db/models/order_items.js';

class Order_ItemsRepository {
  makeOrder = async (item_id, amount) => {
    const order = await Order_Items.create({
      item_id,
      amount,
    });

    return order;
  };
}
export default Order_ItemsRepository;
