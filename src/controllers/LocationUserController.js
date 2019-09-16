const axios = require('axios')
const Users = require('../models/Users')



const Model = require("../models/Chat");
const ModelLocation = require("../models/Location");

var mongoose = require("mongoose");


module.exports = {

  async index (req, res) {

    const { username } = req.params

    const user = await Users.findOne({ user: username })

    const lastLocationUser = await ModelLocation.findOne({ _idUser: user._id })

    // ModelLocation.createIndex({"geometry.coordinates": " 2dsphere"})
    // ModelLocation.index({geometry: '2dsphere'});

    // const perto = await ModelLocation.find({ loc: { $near: [lastLocationUser.geometry.coordinates[0], lastLocationUser.geometry.coordinates[1] ] } })
    
    const latt = lastLocationUser.geometry.coordinates[0]
    const long = lastLocationUser.geometry.coordinates[1]

    const perto = await ModelLocation.find({
      geometry: {
       $near: {
        $maxDistance: 1000,
        $geometry: {
         type: "Point",
         coordinates: [latt, long]
        }
       }
      },
      _idUser: { $ne: mongoose.Types.ObjectId(user._id) }
     }).find((error, results) => {
      if (error) console.log(error);
      console.log(JSON.stringify(results, 0, 2));
     });

    return res.json(perto)
  },


  async store (req, res) {
    const { _idUser, geometry } = req.body;

    const local = { type: 'Point', coordinates: geometry };

    const result = await ModelLocation.create({
        _idUser,
        geometry: local
      });

      return res.json(result)
  }

}
