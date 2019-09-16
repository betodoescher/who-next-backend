const express = require('express')
const UsersController = require('./controllers/UsersController')
const ChatController = require('./controllers/ChatController')
const LocationUserController = require('./controllers/LocationUserController')
// const LikeController = require('./controllers/LikeController')
// const DislikeController = require('./controllers/DislikeController')

const routes = express.Router()

routes.get('/', (req, res) => {
  return res.json({ message: `Olá ${req.query.name}` })
})

routes.get('/users', UsersController.index)
routes.get('/usersbyid/:id', UsersController.usersById)
routes.post('/users', UsersController.store)

routes.get('/locationuser/:username', LocationUserController.index)
routes.post('/locationuser', LocationUserController.store)

routes.get('/chatsusers/:id', ChatController.chatUsers)
routes.get('/chats/origem/:idOrigem/destino/:idDestino', ChatController.index)
routes.post('/chats', ChatController.store)

module.exports = routes
