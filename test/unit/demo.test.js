describe('tests1', function() {
    var user = {
        name: 'limao'
    }

    it('sholud have a name', function() {
        user.should.have.property('name', 'limao');
    })
});
