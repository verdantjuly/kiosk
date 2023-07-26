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
}

export default ItemsRepository;
