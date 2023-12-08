var requireOption = require('../common').requireOption;

/**
 * Create or update a comapny member
 * if there's value create it, otherwise update
 * 
 * If everything is ok, redirect to /companymembers
 */

module.exports = function (objectrepository) {
    var companyMemberModel = requireOption(objectrepository, 'companyMemberModel');
    return function (req, res, next) {
        if (
            typeof req.body.firstname === 'undefined' ||
            typeof req.body.lastname === 'undefined' ||
            typeof req.body.username === 'undefined' ||
            typeof req.body.domain === 'undefined'
        ) {
            return next();
        }

        if (typeof res.locals.companyMember === 'undefined') {
            res.locals.companyMember = new companyMemberModel();
        }
        res.locals.companyMember.firstname = req.body.firstname;
        res.locals.companyMember.lastname = req.body.lastname;
        res.locals.companyMember.username = req.body.username
        res.locals.companyMember.domain = req.body.domain;

        res.locals.companyMember.save().then(()=> res.redirect('/companymembers')).catch((err) => next(err));
    };
};