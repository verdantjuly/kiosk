import Items from '../db/models/items.js';
import Options from '../db/models/options.js';
import myCache from '../cache.js';

class ItemsRepository {
  findid = async id => {
    const findid = await Items.findByPk(id);
    return findid;
  };

  findoption = async option_id => {
    const option = await Options.findByPk(option_id);
    return option;
  };

  makeItem = async (name, price, type, option_id) => {
    const item = await Items.create({
      name,
      price,
      type,
      option_id,
    });

    return item;
  };

  getAllItemList = async () => {
    let allItemList = await Items.findAll({ raw: true });
    return allItemList;
  };

  getItemList = async category => {
    const itemList = await Items.findAll({
      where: { type: category },
      raw: true,
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
