import Order_Items from '../db/models/order_items.js';
import Items from '../db/models/items.js';
import { Transaction } from 'sequelize';
import sequelize from '../db/sequelize.js';

class Order_ItemsRepository {
  findid = async item_id => {
    const findid = await Items.findByPk(item_id);
    return findid;
  };

  makeOrder = async (item_id, amount) => {
    const order = await Order_Items.create({
      item_id,
      amount,
    });

    return order;
  };
  stateChecker = async (id, item_id) => {
    const prevstate = await Order_Items.findOne({ where: { item_id, id } });
    return prevstate;
  };
  editOrderState = async (id, state) => {
    const nextstate = await Order_Items.update({ state }, { where: { id } });
    return nextstate;
  };

  ItemChecker = async item_id => {
    const item = await Items.findByPk(item_id);
    return item;
  };

  pendingToCompleted = async (id, item_id, state, updateamount) => {
    const t = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });
    try {
      const orderUpdate = await Order_Items.update(
        { state },
        { where: { id } },
        { transaction: t },
      );

      const itemUpdate = await Items.update(
        { amount: updateamount },
        { where: { id: item_id } },
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
export default Order_ItemsRepository;
