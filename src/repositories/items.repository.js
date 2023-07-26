import Items from '../db/models/items.js';

class ItemsRepository {
  makeItem = async (name, price, type) => {
    const item = await Items.create({
      name,
      price,
      type,
    });

    return item;
  };
  getAllItemList = async () => {
    const allItemList = await Items.findAll();

    return allItemList;
  };
  getItemList = async category => {
    const itemList = await Items.findAll({
      where: { type: category },
    });

    return itemList;
  };
}

export default ItemsRepository;
