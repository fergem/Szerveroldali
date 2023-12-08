var requireOption = require('../common').requireOption;

/**
 * Gets the company member's hardware if there is any
 * otherwise redirect to /companymembers/:id/hardwares
 */

module.exports = function (objectrepository) {

    var hardwareModel = requireOption(objectrepository, 'hardwareModel');

    return function (req, res, next) {
        if (typeof res.locals.companyMember === 'undefined') {
            return next();
        }

        hardwareModel.findOne({ _owner: res.locals.companyMember._id }).then(hardware => {
            if (!hardware) {
                return next("No hardware to get");
            }
            res.locals.hardware = hardware;
            return next();
        }).catch(err =>  {
            next(err)
        });
    }; 
};