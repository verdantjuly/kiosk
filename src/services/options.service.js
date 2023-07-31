import Messages from './message.js';
import OptionsRepository from '../repositories/options.repository.js';
import myCache from '../cache.js';
import CacheInit from '../cacheinit.js';

const noextra = new Messages('정확한 extra_price');
const noshot = new Messages('정확한 shot_price');
const nohot = new Messages('정확한 hot 여부');
const noid = new Messages('정확한 option id');

class OptionsService {
  cacheinit = new CacheInit();
  optionsRepository = new OptionsRepository();
  makeoption = async (extra_price, shot_price, hot) => {
    const messages = new Messages('옵션 추가');
    try {
      if (extra_price == undefined) {
        return noextra.nosubject();
      } else if (shot_price == undefined) {
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
        await this.cacheinit.cacheinit();
        return messages.status200();
      } else {
        return messages.status400();
      }
    } catch (err) {
      console.log(err);
      return messages.status400();
    }
  };
  editoption = async (extra_price, shot_price, hot, id) => {
    const messages = new Messages('옵션 수정');
    try {
      if (extra_price == undefined) {
        return noextra.nosubject();
      } else if (shot_price == undefined) {
        return noshot.nosubject();
      } else if (hot == undefined) {
        return nohot.nosubject();
      }
      const findid = await this.optionsRepository.findid(id);

      if (!findid) {
        return noid.nosubject();
      }
      const option = await this.optionsRepository.editoption(
        extra_price,
        shot_price,
        hot,
        id,
      );
      if (option) {
        await this.cacheinit.cacheinit();
        return messages.status200();
      } else {
        return messages.status400();
      }
    } catch (err) {
      console.log(err);
      return messages.status400();
    }
  };
  answerremoveoption = async (id, answer) => {
    const messages = new Messages('옵션 삭제');
    try {
      const findid = await this.optionsRepository.findid(id);

      if (!findid) {
        return noid.nosubject();
      }
      const removeoption = myCache.get(`removeoption${id}`);
      if (answer == '예' && removeoption == id) {
        const option = await this.optionsRepository.answerremoveoption(id);
        if (option) {
          await this.cacheinit.cacheinit();
          return messages.status200();
        } else {
          return messages.status400();
        }
      } else {
        return messages.status400();
      }
    } catch (err) {
      console.log(err);
      return messages.status400();
    }
  };
  removeoption = async (id, answer) => {
    const messages = new Messages('옵션 삭제');
    try {
      const findid = await this.optionsRepository.findid(id);

      if (!findid) {
        return noid.nosubject();
      }

      myCache.set(`removeoption${id}`, id, 10000);
      return {
        status: 200,
        message:
          '옵션 삭제를 하면 연관된 상품이 전부 삭제됩니다. 계속 하시겠습니까?',
      };
    } catch (err) {
      console.log(err);
      return messages.status400();
    }
  };
}

export default OptionsService;
