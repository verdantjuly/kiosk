import Messages from './message.js';
import ReceiptsRepository from '../repositories/receipts.repository.js';
const noorder = new Messages('주문');
class ReceiptsService {
  receiptsRepository = new ReceiptsRepository();
  buy = async order => {
    try {
      const receipt = await this.receiptsRepository.buy();
      let totalprice = 0;
      for (let i = 0; i < order.length; i++) {
        const item_id = order[i].item_id;
        const amount = order[i].amount;
        const option = order[i].option;

        const order_customer_id = receipt.id;

        const findprice = await this.receiptsRepository.findprice(item_id);

        const orderlog = await this.receiptsRepository.order(
          order_customer_id,
          item_id,
          amount,
          option,
          findprice.price * amount,
        );

        totalprice = totalprice + findprice.price * amount;
      }

      return {
        status: 200,
        message: '주문에 성공하였습니다.',
        totalprice,
      };
    } catch (err) {
      console.log(err);
      return {
        status: 400,
        message: '주문에 실패하였습니다.',
        totalprice: null,
      };
    }
  };
}
export default ReceiptsService;
