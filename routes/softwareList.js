var renderMW = require('../middleware/generic/render');

var getCompanyMemberMW = require('../middleware/company-members/getCompanyMember');
var getSoftwareListMW = require('../middleware/softwares/getSoftwares');
var updateSoftwareMW = require('../middleware/softwares/updateSoftware');
var getSoftwareMW = require('../middleware/softwares/getSoftware');
var deleteSoftwareMW = require('../middleware/softwares/deleteSoftware');

const companyMemberModel = require('../models/companyMember');
const softwareModel = require('../models/software');


module.exports = function (app) {

    var objectRepository = {
        softwareModel: softwareModel,
        companyMemberModel: companyMemberModel
    };

    /**
     * Add new company member's software
     * - then redirect to /softwares
     */

    app.use('/softwares/:memberid/new',
        getCompanyMemberMW(objectRepository),
        updateSoftwareMW(objectRepository),
        renderMW(objectRepository, 'edit-software'),
    );

    /**
     * Edit the company member's software details
     * - then redirect to /softwares
     */

    app.use('/softwares/:memberid/edit/:softwareid',
        getCompanyMemberMW(objectRepository),
        getSoftwareMW(objectRepository),
        updateSoftwareMW(objectRepository),
        renderMW(objectRepository, 'edit-software'),
    );

    /**
     * Delete company member's software
     * - then redirect to /softwares
     */

    app.use('/softwares/:memberid/delete/:softwareid',
        getCompanyMemberMW(objectRepository),
        getSoftwareMW(objectRepository),
        deleteSoftwareMW(objectRepository),
    );

    /**
     * List all company member's software
     */

    app.use('/softwares/:memberid',
      getCompanyMemberMW(objectRepository),
      getSoftwareListMW(objectRepository),
      renderMW(objectRepository, 'software-list')
    );

};
