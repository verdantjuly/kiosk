import Items from '../db/models/items.js';

class ItemsRepository {
  findid = async item_id => {
    const findid = await Items.findByPk(item_id);
    return findid;
  };

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

  checkamount = async id => {
    const checkItem = await Items.findByPk(id);
    return checkItem;
  };

  removeItem = async id => {
    const removeItem = await Items.destroy({ where: { id } });
    return removeItem;
  };

  editItem = async (id, name, price) => {
    const editItem = await Items.update({ name, price }, { where: { id } });
    return editItem;
  };
}

export default ItemsRepository;
