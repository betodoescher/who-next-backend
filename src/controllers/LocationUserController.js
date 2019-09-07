const axios = require('axios')
const Users = require('../models/Users')

module.exports = {

  async index (req, res) {

    const { username } = req.params

    let usertemp = username

    // será retirado
    if(usertemp == 'betodoescher'){
      usertemp = 'gabrieldarezzo'
    } else {
      usertemp = 'betodoescher'
    }

    const userExists = await Users.findOne({ user: usertemp })

    if (userExists) {
      return res.json(userExists)
    }

   
    const response = await axios.get(`https://api.github.com/users/${usertemp}`)

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
