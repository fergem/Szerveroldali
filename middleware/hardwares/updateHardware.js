var requireOption = require('../common').requireOption;

/**
 * Create or update a company member's hardware
 * if there's value create it, otherwise update
 * 
 * If everything is ok, redirect to /hardwares/:memberid/
 */

module.exports = function (objectrepository) {

    var hardwareModel = requireOption(objectrepository, 'hardwareModel');

    return function (req, res, next) {
        if (
            typeof req.body.itemType === 'undefined' ||
            typeof req.body.name === 'undefined' ||
            typeof req.body.identifier === 'undefined'
        ) {
            return next();
        }

        if (typeof res.locals.hardware === 'undefined') {
            res.locals.hardware = new hardwareModel();
        }
        res.locals.hardware.itemType = req.body.itemType;
        res.locals.hardware.name = req.body.name;
        res.locals.hardware.identifier = req.body.identifier;
        res.locals.hardware._owner = res.locals.companyMember._id;
        res.locals.hardware.save().then(()=> res.redirect(`/hardwares/${res.locals.companyMember._id}`)).catch((err) => next(err));
    };
};