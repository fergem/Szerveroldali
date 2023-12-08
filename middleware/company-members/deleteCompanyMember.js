var requireOption = require('../common').requireOption;

/**
 * Deletes the company member object
 */

module.exports = function (objectrepository) {
    var companyMemberModel = requireOption(objectrepository, 'companyMemberModel');
    var hardwareModel = requireOption(objectrepository, 'hardwareModel');
    var softwareModel = requireOption(objectrepository, 'softwareModel');

    return function(_, res, next) {
        if (typeof res.locals.companyMember === 'undefined') {
            return next();
        }
        hardwareModel.deleteMany({_owner: res.locals.companyMember})
                    .catch((err) => next(err));
        
        softwareModel.deleteMany({_owner: res.locals.companyMember})
                    .catch((err) => next(err));

        companyMemberModel.deleteOne(res.locals.companyMember)
                    .catch((err) => next(err));

        res.redirect("back");
    };
};