/**
 * This middleware has one purpose,
 * redirect the page to the target page that was given in a parameter
 */
module.exports = function (targetPage) {
    return function (req, res, next) {
        res.redirect(`/${targetPage}`)
    };
};