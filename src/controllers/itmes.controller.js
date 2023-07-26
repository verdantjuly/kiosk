import ItemsService from '../services/items.service.js';

class ItemsController {
  itemsService = new ItemsService();

  makeItem = async (req, res) => {
    const { name, price, type } = req.body;

    const { status, message } = await this.itemsService.makeItem(
      name,
      price,
      type,
    );
    return res.status(status).json({ message });
  };
  getItemList = async (req, res) => {
    const { category } = req.query;
    const { status, message, list } = await this.itemsService.getItemList(
      category,
    );
    return res.status(status).json({ message, list });
  };
}

export default ItemsController;
