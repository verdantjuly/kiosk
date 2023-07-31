import Messages from './message.js';
import ReceiptsRepository from '../repositories/receipts.repository.js';
import myCache from '../cache.js';

const noid = new Messages('정확한 상품 id');
const noamount = new Messages('정확한 수량');
const nooption = new Messages('정확한 옵션');
const noorderid = new Messages('정확한 주문 id');

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

        const optiondetail = myCache.get(`option_${finditem.option_id}`);

        const optionprice =
          optiondetail.extra_price * option.extra_price +
          optiondetail.shot_price * option.shot_price;

        totalprice = totalprice + finditem.price * amount + optionprice;
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

  changestate = async (order_customer_id, order) => {
    const changestateM = new Messages('상품 주문 수정');
    try {
      const findorder = await this.receiptsRepository.findorder(
        order_customer_id,
      );
      if (!findorder) {
        return noorderid.nosubject();
      }

      if (order == 'COMPLETED') {
        let finddetailorder = await this.receiptsRepository.finddetailorder(
          order_customer_id,
        );

        let changestate = 0;
        for (let i = 0; i < finddetailorder.length; i++) {
          const id = finddetailorder[i].item_id;
          const finditem = await this.receiptsRepository.finditem(id);
          const amount = finditem.amount - finddetailorder[i].amount;
          changestate = await this.receiptsRepository.changestate(
            order_customer_id,
            id,
            amount,
          );
        }

        if (changestate == 1) {
          return changestateM.status200();
        } else {
          return changestateM.status400();
        }
      } else if (order == 'CANCELED') {
        if (findorder.state === true) {
          return {
            status: 400,
            message: '완료된 주문은 취소할 수 없습니다.',
          };
        }
        const removeorder = await this.receiptsRepository.removeorder(
          order_customer_id,
        );
        if (removeorder == 1) {
          return changestateM.status200();
        } else {
          console.log(rollback);
          return changestateM.status400();
        }
      }
    } catch (err) {
      console.log(err);
      return changestateM.status400();
    }
  };
}
export default ReceiptsService;
