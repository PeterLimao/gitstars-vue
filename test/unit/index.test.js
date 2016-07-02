describe('tests1', function() {
    var user = {
        name: 'limao'
    }

    var Footer = require('components/footer');

    console.log(Footer.data().homeColor);

    it('sholud have a name', function() {
        user.should.have.property('name', 'limao');
    })
});
