var expect = require('chai').expect;
var getCompanyMember = require('../../../../middleware/company-members/getCompanyMember');

describe('getCompanyMember middleware ', function () {
    it("should return member", function(done) {
        const mw = getCompanyMember({
            companyMemberModel: {
                findOne: (id) => {
                    expect(id).to.be.eql({_id: "13"});
                    return Promise.resolve("mockmember");
                }
            }
        })

        const resMock = {
            locals: {}
        }
        mw({params: {
            memberid: "13"
        }},
        resMock,
        () => {
            expect(resMock.locals).to.be.eql({member: "mockmember"});
            done();
        })
    });
})