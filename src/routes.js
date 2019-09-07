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
routes.post('/users', UsersController.store)

routes.get('/locationuser/:username', LocationUserController.index)

routes.get('/chats', ChatController.index)
routes.post('/chats', ChatController.store)

// routes.post('/devs/:devId/likes', LikeController.store)
// routes.post('/devs/:devId/dislikes', DislikeController.store)

module.exports = routes
