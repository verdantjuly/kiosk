import OptionsService from '../services/options.service.js';

class OptionsControlller {
  optionsService = new OptionsService();

  makeoption = async (req, res) => {
    const { extra_price, shot_price, hot } = req.body;

    const { status, message } = await this.optionsService.makeoption(
      extra_price,
      shot_price,
      hot,
    );
    return res.status(status).json({ message });
  };
}

export default OptionsControlller;
