import ReceiptsService from '../services/receipts.service.js';

class ReceiptsController {
  receiptsService = new ReceiptsService();

  buy = async (req, res) => {
    const { order } = req.body;

    const { status, message, totalprice } = await this.receiptsService.buy(
      order,
    );
    return res.status(status).json({ message, totalprice });
  };
}
export default ReceiptsController;
