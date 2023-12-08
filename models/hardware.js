const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Hardware = db.model('Hardware', {
  name: String,
  itemType: String,
  identifier: String,
  _owner: {
    type: Schema.Types.ObjectId,
    ref: 'CompanyMember'
  },
});

module.exports = Hardware;