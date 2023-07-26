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
}

export default ItemsController;
