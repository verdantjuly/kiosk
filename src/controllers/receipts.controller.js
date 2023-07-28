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

  changestate = async (req, res) => {
    const { order_customer_id } = req.params;
    const { order } = req.body;

    const { status, message } = await this.receiptsService.changestate(
      order_customer_id,
      order,
    );
    return res.status(status).json({ message });
  };
}
export default ReceiptsController;
