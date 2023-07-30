import OptionsRepository from './repositories/options.repository.js';

async function cacheinit() {
  const optionsRepository = new OptionsRepository();
  await optionsRepository.getoptions();
}

export default cacheinit;
