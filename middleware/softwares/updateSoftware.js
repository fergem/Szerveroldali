var requireOption = require('../common').requireOption;

/**
 * Create or update a company member's software
 * if there's value create it, otherwise update
 * 
 * If everything is ok, redirect to /softwares/:memberid
 */

module.exports = function (objectrepository) {

    var softwareModel = requireOption(objectrepository, 'softwareModel');
    return function (req, res, next) {
        if (
            typeof req.body.displayName === 'undefined' ||
            typeof req.body.publisher === 'undefined' ||
            typeof req.body.installDate === 'undefined'
        ) {
            return next();
        }

        if (typeof res.locals.software === 'undefined') {
            res.locals.software = new softwareModel();
        }
        res.locals.software.displayName = req.body.displayName;
        res.locals.software.publisher = req.body.publisher;
        res.locals.software.installDate = req.body.installDate;
        res.locals.software._owner = res.locals.companyMember._id;
        res.locals.software.save().then(()=> res.redirect(`/softwares/${res.locals.companyMember._id}`)).catch((err) => next(err));
    };
};