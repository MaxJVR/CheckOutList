/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt');

module.exports = {

  attributes: {

   userName: {
      type: 'string',
      required: true,
      unique: true
    },
    email: {
      type: 'email',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      minLength: 6,
      required: true
    },
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    about: {
      type: 'string'
    },
    image: {
      type: 'string'
    },
    lists: {
      collection: 'List',
      via: 'users'
    }

  },

  beforeCreate: function(values, callback) {
    bcrypt.hash(values.password, 10, function(err,hash){
      if(err) return callback(err);
      values.password = hash;
      callback();
    });

  }
};

