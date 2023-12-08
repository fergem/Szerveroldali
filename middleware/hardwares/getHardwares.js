var requireOption = require('../common').requireOption;

/**
 * Gets a company member's hardware list
 */

module.exports = function (objectrepository) {
    var hardwareModel = requireOption(objectrepository, 'hardwareModel');

    return function (req, res, next) {
        hardwareModel.find({_owner: req.params.memberid}).then(s => {
            res.locals.hardwares = s;
            return next();
        }).catch(err =>  {
            next(err)
        });
    }; 
};