const Model = require("../models/Chat");
const ModelUsers = require("../models/Users");

// const ObjectId = require('mongoose.Types.ObjectId');

var mongoose = require("mongoose");

module.exports = {
  async index(req, res) {
    const { idOrigem, idDestino } = req.params;

    const chats = await Model.find( { $or:[ 
      {'_idUserOrigin':mongoose.Types.ObjectId(idOrigem)}, 
      {'_idUserDestiny':mongoose.Types.ObjectId(idDestino)} ,
      {'_idUserOrigin':mongoose.Types.ObjectId(idDestino)}, 
      {'_idUserDestiny':mongoose.Types.ObjectId(idOrigem)} 
    ]},
        function(err,docs){
          if(!err) res.send(docs);
      });
  },

  async chatUsers(req, res) {
    const { id } = req.params;

    const chats = await Model.aggregate(
      [
        {
          $match: {
            _idUserOrigin: mongoose.Types.ObjectId(id)
          }
        },
        {
          $group: {
            _id: "$_idUserDestiny" //$region is the column name in collection
            // count: {$sum: 1}
          }
        }
      ],
      function(err, result) {
        if (err) {
          next(err);
        } else {
          const ids = result.map(elem => {
            return elem._id;
          });

          console.log(ids);

          const results = ModelUsers.aggregate(
            [
              {
                $match: {
                  _id: { $in: ids }
                }
              }
            ],
            function(err, result2) {
              if (err) {
                next(err);
              } else {
                res.json(result2);
              }
            }
          );
        }
      }
    )
  },

  async store(req, res) {
    const { _idUserOrigin, _idUserDestiny, text } = req.body;

    const result = await Model.create({
      _idUserOrigin,
      _idUserDestiny,
      text
    });

    const targetSocket = req.connectedUsers[_idUserDestiny];

    if (targetSocket) {
      req.io.to(targetSocket).emit("match", result);
    }

    return res.json(result);
  }
};
