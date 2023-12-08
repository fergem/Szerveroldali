var requireOption = require('../common').requireOption;

/**
 * Gets the company members list
 */

module.exports = function (objectrepository) {
    var companyMemberModel = requireOption(objectrepository, 'companyMemberModel');

    return function (_, res, next) {
        companyMemberModel.find({}).then(s => {
            res.locals.companyMembers = s;
            return next();
        }).catch(err =>  {
            next(err)
        });
    }; 
};