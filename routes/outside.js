var redirectMW = require('../middleware/generic/redirect');

module.exports = function (app) {


    /**
     * Main page
     */
    app.get('/',
        redirectMW('companymembers')
    );

};