import ItemsService from '../services/items.service.js';

class ItemsController {
  itemsService = new ItemsService();

  makeItem = async (req, res) => {
    const { name, price, type, option_id } = req.body;

    const { status, message } = await this.itemsService.makeItem(
      name,
      price,
      type,
      option_id,
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
  removeItem = async (req, res) => {
    const { id } = req.params;
    const { status, message } = await this.itemsService.removeItem(id);
    return res.status(status).json({ message });
  };
  answerRemoveItem = async (req, res) => {
    const { id } = req.params;
    const { answer } = req.body;
    const { status, message } = await this.itemsService.answerRemoveItem(
      id,
      answer,
    );
    return res.status(status).json({ message });
  };
  editItem = async (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    const { status, message } = await this.itemsService.editItem(
      id,
      name,
      price,
    );
    return res.status(status).json({ message });
  };
}

export default ItemsController;
