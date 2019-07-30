const db = require("../models");

// Defining methods for the NameIDController
module.exports = {
  autocomplete: function (req,res) {
    console.log(req.query);
    db.NameID.find({'$or': [{'name' : new RegExp(req.params.name, 'i')}, 
    {'alias' : new RegExp(req.params.name, 'i')}]
    })
      .sort({ name: -1 })
      .limit(5)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
    },
  findAll: function(req, res) {
    console.log(req.query);
    db.NameID
      .find(req.query || {})
      .sort({ name: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.NameID
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByName: function(req,res) {
    db.NameID
      .findByName(req.params.name)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.NameID
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.NameID
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  removeAll: function(req, res) {
    db.NameID
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.NameID
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
