import Messages from './message.js';
import ReceiptsRepository from '../repositories/receipts.repository.js';

const noid = new Messages('정확한 상품 id');
const noamount = new Messages('정확한 수량');
const nooption = new Messages('정확한 옵션');

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

        const finditem = await this.receiptsRepository.finditem(item_id);

        if (!finditem) {
          return noid.nosubject();
        } else if (!amount) {
          return noamount.nosubject();
        } else if (!option) {
          return nooption.nosubject();
        }

        const orderlog = await this.receiptsRepository.order(
          order_customer_id,
          item_id,
          amount,
          option,
          finditem.price * amount,
        );

        totalprice = totalprice + finditem.price * amount;
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
