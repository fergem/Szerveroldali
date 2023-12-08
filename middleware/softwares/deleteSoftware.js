var requireOption = require('../common').requireOption;

/**
 * Deletes the software object
 */

module.exports = function (objectrepository) {
    var softwareModel = requireOption(objectrepository, 'softwareModel');

    return function(_, res, next) {
        if (typeof res.locals.software === 'undefined') {
            return next();
        }

        softwareModel.deleteOne(res.locals.software)
                    .then(()=> res.redirect(`/softwares/${res.locals.companyMember._id}`))
                    .catch((err) => next(err));
    };
};