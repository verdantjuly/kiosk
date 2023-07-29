import Messages from './message.js';
import ItemsRepository from '../repositories/items.repository.js';
import Enum from '../db/models/enum.js';
const noid = new Messages('정확한 상품 id');
const noname = new Messages('이름');
const noprice = new Messages('가격');
const nooption = new Messages('정확한 옵션');
class ItemsService {
  itemsRepository = new ItemsRepository();
  makeItem = async (name, price, type, option_id) => {
    const messages = new Messages('상품 추가');
    try {
      const option = await this.itemsRepository.findoption(option_id);
      if (!name.length) {
        return noname.nosubject();
      } else if (!price) {
        return noprice.nosubject();
      } else if (Enum.itemTypes[type] == undefined) {
        return {
          status: 400,
          message: '알맞은 타입을 지정해 주세요.',
        };
      } else if (!option) {
        return nooption.nosubject();
      }

      const item = await this.itemsRepository.makeItem(
        name,
        price,
        Enum.itemTypes[type],
        option_id,
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
        const finalList = allItemList.allItemList.map(item => {
          const option = allItemList.result
            .map(item2 => {
              if (item.option_id == item2.id) {
                return item2;
              } else return null;
            })
            .filter(item3 => item3 !== null);
          return {
            id: item.id,
            name: item.name,
            option_id: item.option_id,
            option: option,
            price: item.price,
            type: item.type,
            amount: item.amount,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          };
        });

        return {
          status: 200,
          message: '전체 상품이 조회되었습니다.',
          list: finalList,
        };
      } else {
        const itemList = await this.itemsRepository.getItemList(category);
        const finalList = itemList.itemList.map(item => {
          const option = itemList.result
            .map(item2 => {
              if (item.option_id == item2.id) {
                return item2;
              } else return null;
            })
            .filter(item3 => item3 !== null);
          return {
            id: item.id,
            name: item.name,
            option_id: item.option_id,
            option: option,
            price: item.price,
            type: item.type,
            amount: item.amount,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          };
        });
        return {
          status: 200,
          message: `${category} 타입의 상품이 조회되었습니다.`,
          list: finalList,
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
