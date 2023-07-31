import Messages from './message.js';
import Order_ItemsRepository from '../repositories/order_items.repository.js';
import Enum from '../db/models/enum.js';
const noid = new Messages('정확한 상품 id');
const noamount = new Messages('수량');
const noorderid = new Messages('발주 id');
const nostate = new Messages('상품 상태');
const noenumstate = new Messages('정확한 상품 상태');
class Order_ItemsService {
  order_itemRepository = new Order_ItemsRepository();
  makeOrder = async (item_id, amount) => {
    const messages = new Messages('상품 발주');

    try {
      const findid = await this.order_itemRepository.findid(item_id);
      if (!item_id || !findid) {
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
  editOrderState = async (item_id, id, state) => {
    const messages = new Messages('상품 발주 상태 수정');
    try {
      const findid = await this.order_itemRepository.findid(item_id);
      if (!item_id || !findid) {
        return noid.nosubject();
      } else if (!id) {
        return noorderid.nosubject();
      } else if (!state) {
        return nostate.nosubject();
      } else if (Enum.orderItemState[state] == undefined) {
        return noenumstate.nosubject();
      }

      const prevstate = await this.order_itemRepository.stateChecker(
        id,
        item_id,
      );

      if (!prevstate.item_id) {
        return messages.status400;
      }

      if (
        (prevstate.state == 0 && state == 'PENDING') ||
        (prevstate.state == 1 && state == 'CANCELED') ||
        (prevstate.state == 0 && state == 'CANCELED')
      ) {
        const nextstate = await this.order_itemRepository.editOrderState(
          id,
          Enum.orderItemState[state],
        );
        return messages.status200();
      } else if (prevstate.state == 1 && state == 'COMPLETED') {
        const item = await this.order_itemRepository.ItemChecker(item_id);
        const updateamount = item.amount + prevstate.amount;
        const pendingToCompleted =
          await this.order_itemRepository.pendingToCompleted(
            id,
            item_id,
            Enum.orderItemState[state],
            updateamount,
          );
        if (pendingToCompleted == 1) {
          return messages.status200();
        }
      } else if (prevstate.state == 2 && state !== 'COMPLETED') {
        const item = await this.order_itemRepository.ItemChecker(item_id);
        const updateamount = item.amount - prevstate.amount;
        if (updateamount < 0) {
          return {
            status: 400,
            message: '현재 수량이 발주 수량보다 적어 발주 취소가 불가능합니다.',
          };
        }
        const pendingToCompleted =
          await this.order_itemRepository.pendingToCompleted(
            id,
            item_id,
            Enum.orderItemState[state],
            updateamount,
          );
        if (pendingToCompleted == 1) {
          return messages.status200();
        }
      } else {
        messages.status400();
      }
    } catch (err) {
      console.log(err);
      return messages.status400();
    }
  };
}
export default Order_ItemsService;
