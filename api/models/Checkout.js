/**
 * Checkout.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    title: {
      type: 'string',
      required: true,
    },
    body: {
      type: 'string'
    },
    image: {
      type: 'string'
    },
    checked:{
      type: 'boolean'
    },
    lists: {
      collection: 'List',
      via: 'checkouts'
    }

  }
};

