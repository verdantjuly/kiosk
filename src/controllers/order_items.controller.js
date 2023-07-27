import Order_ItemsService from '../services/order_items.service.js';

class Order_ItemsController {
  order_itemsService = new Order_ItemsService();

  makeOrder = async (req, res) => {
    const { item_id } = req.params;
    const { amount } = req.body;

    const { status, message, order } = await this.order_itemsService.makeOrder(
      item_id,
      amount,
    );
    return res.status(status).json({ message, order });
  };
}
export default Order_ItemsController;
