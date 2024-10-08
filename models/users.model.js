const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true
    }
  },{
    timestamps: true,
  }
);

const Users = mongoose.model('Users', userSchema);

module.exports = Users;