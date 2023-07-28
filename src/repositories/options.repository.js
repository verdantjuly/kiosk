import Options from '../db/models/options.js';

class OptionsRepository {
  makeoption = async (extra_price, shot_price, hot) => {
    const option = await Options.create({ extra_price, shot_price, hot });
    return option;
  };
}
export default OptionsRepository;
