var renderMW = require('../middleware/generic/render');

var getCompanyMemberListMW = require('../middleware/company-members/getCompanyMembers');
var updateCompanyMemberMW = require('../middleware/company-members/updateCompanyMember');
var getCompanyMemberMW = require('../middleware/company-members/getCompanyMember');
var deleteCompanyMemberMW = require('../middleware/company-members/deleteCompanyMember');

const companyMemberModel = require('../models/companyMember');
const hardwareModel = require('../models/hardware');
const softwareModel = require('../models/software');

module.exports = function (app) {

    var objectRepository = {
        companyMemberModel: companyMemberModel,
        hardwareModel: hardwareModel,
        softwareModel: softwareModel,
    };

    /**
     * Add new company member
     * - then redirect to /companymembers
     */

    app.use('/companymembers/new',
        updateCompanyMemberMW(objectRepository),
        renderMW(objectRepository, 'edit-member'),
    );

    /**
     * Edit the company member details
     * - then redirect to /companymembers
     */

    app.use('/companymembers/:memberid/edit',
        getCompanyMemberMW(objectRepository),
        updateCompanyMemberMW(objectRepository),
        renderMW(objectRepository, 'edit-member'),
    );

    /**
     * Delete company member
     * - then redirect to /companymembers
     */

    app.use('/companymembers/:memberid/delete',
        getCompanyMemberMW(objectRepository),
        deleteCompanyMemberMW(objectRepository),
    );

    /**
     * List all company member
     */

    app.use('/companymembers',
      getCompanyMemberListMW(objectRepository),
      renderMW(objectRepository, 'companymembers')
    );

};
