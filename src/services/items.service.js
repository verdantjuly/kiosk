import Messages from './message.js';
import ItemsRepository from '../repositories/items.repository.js';
import Enum from '../db/models/enum.js';
const noid = new Messages('정확한 상품 id');
const noname = new Messages('이름');
const noprice = new Messages('가격');
class ItemsService {
  itemsRepository = new ItemsRepository();
  makeItem = async (name, price, type) => {
    const messages = new Messages('상품 추가');

    try {
      if (!name.length) {
        return noname.nosubject();
      } else if (!price) {
        return noprice.nosubject();
      } else if (Enum.itemTypes[type] == undefined) {
        return {
          status: 400,
          message: '알맞은 타입을 지정해 주세요.',
        };
      }

      const item = await this.itemsRepository.makeItem(
        name,
        price,
        Enum.itemTypes[type],
      );
      if (item.name) {
        return messages.status200();
      } else {
        return messages.status400();
      }
    } catch (err) {
      console.log(err);
      return messages.status400();
    }
  };
  getItemList = async category => {
    try {
      if (category == 'all') {
        const allItemList = await this.itemsRepository.getAllItemList();
        return {
          status: 200,
          message: '전체 상품이 조회되었습니다.',
          list: allItemList,
        };
      } else {
        const itemList = await this.itemsRepository.getItemList(category);
        return {
          status: 200,
          message: `${category} 타입의 상품이 조회되었습니다.`,
          list: itemList,
        };
      }
    } catch (err) {
      return {
        status: 400,
        message: '상품 조회에 실패하였습니다.',
        list: null,
      };
    }
  };
  removeItem = async id => {
    const messages = new Messages('상품 삭제');
    try {
      const checkItem = await this.itemsRepository.checkamount(id);
      if (checkItem.amount > 0) {
        return {
          status: 200,
          message: '현재 수량이 남아있습니다. 삭제하시겠습니까?',
        };
      } else if (checkItem.amount == 0) {
        const removeItem = await this.itemsRepository.removeItem(id);
        if (removeItem) {
          return messages.status200();
        }
      }
    } catch (err) {
      return messages.status400();
    }
  };
  answerRemoveItem = async (id, answer) => {
    const messages = new Messages('상품 삭제');
    try {
      if (answer == '예') {
        const removeItem = await this.itemsRepository.removeItem(id);
        if (removeItem) {
          return messages.status200();
        }
      } else {
        return messages.status400();
      }
    } catch (err) {
      return messages.status400();
    }
  };
  editItem = async (id, name, price) => {
    const messages = new Messages('상품 수정');
    const findid = await this.order_itemRepository.findid(item_id);
    try {
      if (!findid) {
        return noid.nosubject();
      } else if (!name.length) {
        return noname.nosubject();
      } else if (!price) {
        return noprice.nosubject();
      } else if (price < 0) {
        return {
          status: 400,
          message: '알맞은 가격을 입력해주세요.',
        };
      }

      const item = await this.itemsRepository.editItem(id, name, price);
      if (item) {
        return messages.status200();
      } else {
        return messages.status400();
      }
    } catch (err) {
      return messages.status400();
    }
  };
}
export default ItemsService;
