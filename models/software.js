const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Software = db.model('Software', {
  displayName: String,
  publisher: String,
  installDate: String,
  _owner: {
    type: Schema.Types.ObjectId,
    ref: 'CompanyMember'
  },
});

module.exports = Software;