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

    // console.log(req.connectedUsers)
    // console.log(req.connectedUsers[_idUserOrigin])
    // console.log(req.connectedUsers[_idUserDestiny])

    // console.log(_idUserOrigin, _idUserDestiny)

    // const loggedSocket = req.connectedUsers[_idUserOrigin]
    const targetSocket = req.connectedUsers[_idUserDestiny]
    // console.log(loggedSocket)

    // if(loggedSocket){
    //     req.io.to(loggedSocket).emit('match', result)
    // }
    if(targetSocket){
        req.io.to(targetSocket).emit('match', result)
    }

    return res.json(result)
  }
}
