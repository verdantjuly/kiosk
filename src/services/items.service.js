import Messages from './message.js';
import ItemsRepository from '../repositories/items.repository.js';
const noname = new Messages('이름');
const noprice = new Messages('가격');
class ItemsService {
  itemsRepository = new ItemsRepository();
  makeItem = async (name, price, type) => {
    const messages = new Messages('상품 추가');

    try {
      console.log(type);
      if (!name.length) {
        return noname.nosubject();
      } else if (!price) {
        return noprice.nosubject();
      } else if (!['COFFEE', 'JUICE', 'FOOD'].includes(type)) {
        return {
          status: 400,
          message: '알맞은 타입을 지정해 주세요.',
        };
      }
      const item = await this.itemsRepository.makeItem(name, price, type);
      if (item.name) {
        return messages.status200();
      }
    } catch (err) {
      return messages.status400();
    }
  };
}
export default ItemsService;
