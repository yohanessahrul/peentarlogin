const User = require('../models/m_user');
const bcrypt = require('bcryptjs');

module.exports = {
  findAll(req, res, next) {
    User.find(function(err, response) {
      if (!err) {
        res.status(200).json({
          msg: 'Data berhasil didapatkan',
          data: response
        })
      } else {
        res.status(500).json({
          msg: 'Error'
        })
      }
    })
  },
  registerUser(req, res, next){
    // 1. email unique
    User.findOne({email: req.body.email})
      .then(response => {
        if(response) {
          res.status(409).json({
            msg: 'Email sudah terpakai',
            msg2: 'emailunique'
          })
        } else {
          let hash = bcrypt.hashSync(req.body.password, 10);
          let newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            gender: req.body.gender,
            age: req.body.age,
            email: req.body.email,
            phone: req.body.phone,
            password: hash,
          })
          newUser.save(function(err, response) {
            if (err) {
              res.status(500).json({
                msg: 'Error internal server'
              })
            } else {
              res.status(200).json({
                msg: 'Data berhasil diinput',
                msg2: 'registersukses',
                data: response
              })
            }
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          msg: 'Error internal server'
        })
      })
  }
}