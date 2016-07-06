import Footer from 'components/footer';

describe('footer.vue 组件测试', () => {
    it('data　应该是一个函数', () => {
        Footer.data.should.be.type('function');
    });

    it('data() 应该返回一个对象', () => {
        Footer.data().should.be.type('object');
    });

    it('data() 应该有属性 homeColor', () => {
        Footer.data().should.have.property('homeColor');
    });

    it('data() 应该有属性 searchColor', () => {
        Footer.data().should.have.property('searchColor');
    });

    it('data() 应该有属性 moreColor', () => {
        Footer.data().should.have.property('moreColor');
    });
});
