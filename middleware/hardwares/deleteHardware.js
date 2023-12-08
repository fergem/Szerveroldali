var requireOption = require('../common').requireOption;

/**
 * Deletes the hardware object
 */

module.exports = function (objectrepository) {
    var hardwareModel = requireOption(objectrepository, 'hardwareModel');

    return function(_, res, next) {
        if (typeof res.locals.hardware === 'undefined') {
            return next();
        }
        
        hardwareModel.deleteOne(res.locals.hardware)
                    .then(()=> res.redirect(`/hardwares/${res.locals.companyMember._id}`))
                    .catch((err) => next(err));
    };
};