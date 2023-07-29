import Options from '../db/models/options.js';
import myCache from '../cache.js';

class OptionsRepository {
  makeoption = async (extra_price, shot_price, hot) => {
    const option = await Options.create({ extra_price, shot_price, hot });
    const options = await Options.findAll();
    const success = myCache.set('options', options, 10000);
    if (success) {
      console.log('cache success');
    } else {
      console.log('cache failed');
    }
    return option;
  };
  getoptions = async () => {
    const options = await Options.findAll();
    return options;
  };
}
export default OptionsRepository;
