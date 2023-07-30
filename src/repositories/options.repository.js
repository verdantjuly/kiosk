import Options from '../db/models/options.js';
import Items from '../db/models/items.js';
import cacheinit from '../cacheinit.js';
import myCache from '../cache.js';

class OptionsRepository {
  makeoption = async (extra_price, shot_price, hot) => {
    const option = await Options.create({ extra_price, shot_price, hot });
    const options = await Options.findAll();
    cacheinit();
    return option;
  };
  getoptions = async () => {
    const options = await Options.findAll();
    const success = myCache.set('options', options, 10000);
    if (success) {
      console.log('cache success');
    } else {
      console.log('cache failed');
    }
    return options;
  };
  findid = async id => {
    const findid = await Options.findByPk(id);
    return findid;
  };
  editoption = async (extra_price, shot_price, hot, id) => {
    const editoption = await Options.update(
      { extra_price, shot_price, hot },
      { where: { id } },
    );
    cacheinit();
    return editoption;
  };

  answerremoveoption = async id => {
    await Items.destroy({ where: { option_id: id } });
    const answerremoveoption = await Options.destroy({ where: { id } });
    cacheinit();
    return answerremoveoption;
  };
}
export default OptionsRepository;
