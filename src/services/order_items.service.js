import Messages from './message.js';
import Order_ItemsRepository from '../repositories/order_items.repository.js';
const noid = new Messages('상품 id');
const noamount = new Messages('수량');
class Order_ItemsService {
  order_itemRepository = new Order_ItemsRepository();
  makeOrder = async (item_id, amount) => {
    const messages = new Messages('상품 발주');

    try {
      if (!item_id) {
        return noid.nosubject();
      } else if (!amount) {
        return noamount.nosubject();
      }

      const order = await this.order_itemRepository.makeOrder(item_id, amount);
      if (order) {
        return {
          status: 200,
          message: '상품 발주에 성공하였습니다.',
          order,
        };
      } else {
        return messages.status400();
      }
    } catch (err) {
      console.log(err);
      return messages.status400();
    }
  };
}
export default Order_ItemsService;
