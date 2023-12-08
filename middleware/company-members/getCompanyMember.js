var requireOption = require('../common').requireOption;

/**
 * Gets the company member if there is any
 * otherwise redirect to /companymembers
 */

module.exports = function (objectrepository) {
    var companyMemberModel = requireOption(objectrepository, 'companyMemberModel');

    return function (req, res, next) {
        companyMemberModel.findOne({ _id: req.params.memberid }).then(member => {
            if (!member) {
                return next("No company member to get");
            }
            res.locals.companyMember = member;
            return next();
        }).catch(err =>  {
            next(err)
        });
    }; 
};