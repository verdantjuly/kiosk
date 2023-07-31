import OptionsRepository from './repositories/options.repository.js';
import myCache from './cache.js';
class CacheInit {
  optionsRepository = new OptionsRepository();
  cacheinit = async () => {
    const options = await this.optionsRepository.getoptions();
    options.forEach(option => {
      const success = myCache.set(`option_${option.id}`, option, 10000);
      if (!success) {
        console.error(`option_${option.id} cache failed`);
      }
    });
  };
}

export default CacheInit;
