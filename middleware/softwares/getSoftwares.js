var requireOption = require('../common').requireOption;

/**
 * Gets a company member's software list
 */

module.exports = function (objectrepository) {
    var softwareModel = requireOption(objectrepository, 'softwareModel');

    return function (req, res, next) {
        softwareModel.find({_owner: req.params.memberid}).then(s => {
            res.locals.softwares = s;
            return next();
        }).catch(err =>  {
            next(err)
        });
    }; 
};