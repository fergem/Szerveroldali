var renderMW = require('../middleware/generic/render');

var getCompanyMemberMW = require('../middleware/company-members/getCompanyMember');
var getHardwareListMW = require('../middleware/hardwares/getHardwares');
var updateHardwareMW = require('../middleware/hardwares/updateHardware');
var getHardwareMW = require('../middleware/hardwares/getHardware');
var deleteHardwareMW = require('../middleware/hardwares/deleteHardware');

const companyMemberModel = require('../models/companyMember');
const hardwareModel = require('../models/hardware');

module.exports = function (app) {

    var objectRepository = {
        hardwareModel: hardwareModel,
        companyMemberModel: companyMemberModel
    };

    /**
     * Add new company member's hardware
     * - then redirect to /hardwares
     */

    app.use('/hardwares/:memberid/new',
        getCompanyMemberMW(objectRepository),
        updateHardwareMW(objectRepository),
        renderMW(objectRepository, 'edit-hardware'),
    );

    /**
     * Edit the company member's hardware details
     * - then redirect to /hardwares
     */

    app.use('/hardwares/:memberid/edit/:hardwareid',
        getCompanyMemberMW(objectRepository),
        getHardwareMW(objectRepository),
        updateHardwareMW(objectRepository),
        renderMW(objectRepository, 'edit-hardware'),
    );

    /**
     * Delete company member's hardware
     * - then redirect to /hardwares
     */

    app.use('/hardwares/:memberid/delete/:hardwareid',
        getCompanyMemberMW(objectRepository),
        getHardwareMW(objectRepository),
        deleteHardwareMW(objectRepository),
    );

    /**
     * List all company member's hardware
     */

    app.use('/hardwares/:memberid',
        getCompanyMemberMW(objectRepository),
        getHardwareListMW(objectRepository),
        renderMW(objectRepository, 'hardware-list')
    );

};
