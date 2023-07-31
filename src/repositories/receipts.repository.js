import Order_Customers from '../db/models/order_customers.js';
import Item_Order_Customers from '../db/models/item_order_customers.js';
import Items from '../db/models/items.js';
import { Transaction } from 'sequelize';
import sequelize from '../db/sequelize.js';

class ReceiptsRepository {
  buy = async () => {
    const item = await Order_Customers.create({});
    return item;
  };

  order = async (order_customer_id, item_id, amount, option, price) => {
    const order = await Item_Order_Customers.create({
      order_customer_id,
      item_id,
      amount,
      option,
      price,
    });

    return order;
  };
  finditem = async item_id => {
    const finditem = await Items.findByPk(item_id);
    return finditem;
  };

  findorder = async order_customer_id => {
    const findorder = await Order_Customers.findByPk(order_customer_id);
    return findorder;
  };
  finddetailorder = async order_customer_id => {
    const finddetailorder = await Item_Order_Customers.findAll({
      where: { order_customer_id },
    });
    return finddetailorder;
  };

  changestate = async (order_customer_id, id, amount) => {
    const t = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });
    try {
      const orderUpdate = await Order_Customers.update(
        { state: true },
        { where: { id: order_customer_id } },
        { transaction: t },
      );

      const itemUpdate = await Items.update(
        { amount },
        { where: { id } },
        { transaction: t },
      );

      await t.commit();
      return 1;
    } catch (err) {
      console.log(err);
      await t.rollback();
      return 0;
    }
  };

  removeorder = async order_customer_id => {
    const t = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });
    try {
      const removeOrderCustomer = await Order_Customers.destroy(
        { where: { id: order_customer_id } },
        { transaction: t },
      );

      const removeItemOrderCustomer = await Item_Order_Customers.destroy(
        { where: { order_customer_id } },
        { transaction: t },
      );
      await t.commit();
      return 1;
    } catch (err) {
      console.log(err);
      await t.rollback();
      return 0;
    }
  };
}
export default ReceiptsRepository;
