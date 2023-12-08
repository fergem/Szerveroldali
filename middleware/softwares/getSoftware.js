var requireOption = require('../common').requireOption;

/**
 * Gets the company member's software if there is any
 * otherwise redirect to /companymembers/:id/softwares
 */

module.exports = function (objectrepository) {

    var softwareModel = requireOption(objectrepository, 'softwareModel');

    return function (req, res, next) {
        if (typeof res.locals.companyMember === 'undefined') {
            return next();
        }

        softwareModel.findOne({ _owner: res.locals.companyMember._id }).then(software => {
            if (!software) {
                return next("No software to get");
            }
            res.locals.software = software;
            return next();
        }).catch(err =>  {
            next(err)
        });
    }; 
};