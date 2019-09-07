const axios = require('axios')
const Users = require('../models/Users')

module.exports = {

  async index (req, res) {
    let username = 'gabrieldarezzo'
    if (req.username == 'gabrieldarezzo') {
      username = 'betodoescher'
    }

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
