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
  editoption = async (req, res) => {
    const { id } = req.params;
    const { extra_price, shot_price, hot } = req.body;
    const { status, message } = await this.optionsService.editoption(
      extra_price,
      shot_price,
      hot,
      id,
    );
    return res.status(status).json({ message });
  };
  answerremoveoption = async (req, res) => {
    const { id } = req.params;
    const { answer } = req.body;
    const { status, message } = await this.optionsService.answerremoveoption(
      id,
      answer,
    );
    return res.status(status).json({ message });
  };
  removeoption = async (req, res) => {
    const { id } = req.params;
    const { status, message } = await this.optionsService.removeoption(id);
    return res.status(status).json({ message });
  };
}

export default OptionsControlller;
