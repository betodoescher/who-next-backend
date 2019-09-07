const axios = require('axios')
const Users = require('../models/Users')

module.exports = {

  async index (req, res) {
    if (!req.headers.user) {
      // Show all unsers if not set
      const users = await Users.find()
      return res.json(users)
    } else {
      const { user } = req.headers
      const loggedDev = await Users.findById(user)
      const arrFields = [
        { _id: { $ne: user } },
        { _id: { $nin: loggedDev.likes } },
        { _id: { $nin: loggedDev.dislikes } }
      ]
      const users = await Users.find({
        $and: arrFields
      })
      return res.json(users)
    }
  },
  async store (req, res) {
    const { username } = req.body

    const userExists = await Users.findOne({ user: username })

    if (userExists) {
      return res.json(userExists)
    }

    const response = await axios.get(`https://api.github.com/users/${username}`)

    const { name, bio, avatar_url: avatar } = response.data

    const user = await Users.create({
      name,
      user: username,
      bio,
      avatar
    })

    return res.json(user)
  }
}
