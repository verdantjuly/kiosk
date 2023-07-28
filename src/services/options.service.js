import Messages from './message.js';
import OptionsRepository from '../repositories/options.repository.js';
const noextra = new Messages('정확한 extra_price');
const noshot = new Messages('정확한 shot_price');
const nohot = new Messages('정확한 hot 여부');
class OptionsService {
  optionsRepository = new OptionsRepository();
  makeoption = async (extra_price, shot_price, hot) => {
    const messages = new Messages('옵션 추가');
    try {
      if (!extra_price) {
        return noextra.nosubject();
      } else if (!shot_price) {
        return noshot.nosubject();
      } else if (hot == undefined) {
        return nohot.nosubject();
      }

      const option = await this.optionsRepository.makeoption(
        extra_price,
        shot_price,
        hot,
      );
      if (option) {
        return messages.status200();
      } else {
        return messages.status400();
      }
    } catch (err) {
      console.log(err);
      return messages.status400();
    }
  };
}

export default OptionsService;
