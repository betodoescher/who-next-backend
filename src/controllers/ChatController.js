const Model = require('../models/Chat')

module.exports = {

  async index (req, res) {
    const chats = await Model.find()
    return res.json(chats)
  },

  async store (req, res) {
    const { _idUserOrigin, _idUserDestiny, text } = req.body

    const result = await Model.create({
      _idUserOrigin,
      _idUserDestiny,
      text
    })

    return res.json(result)
  }
}
