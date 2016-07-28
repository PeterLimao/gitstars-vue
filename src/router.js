/**
 * filter.js
 * @author PeterL
 */
import State from 'state';

export default (router) => {
    router.map({
        '/trending': {
            component (resolve) {
                require(['view/trendingPanel'], resolve);
            }
        },
        '/search': {
            component (resolve) {
                require(['view/searchPanel'], resolve);
            }
        },
        '/stars': {
            component (resolve) {
                require(['view/starsPanel'], resolve);
            }
        },
        '/detail/*name': {
            component (resolve) {
                require(['view/readmeDetail'], resolve);
            }
        }
    });

    router.beforeEach(({from, to, next}) => {
        if (/(detail)/g.test(to.path)) {
            State.isLoad = true;
        }
        if (from.path === undefined && to.path !== '/trending') {
            router.replace('/trending');
        }
        next();
    });

    router.afterEach(({to}) => {
        if (/(detail)/g.test(to.path)) {
            State.isLoad = false;
        }
    });

    router.redirect({
        '*': '/trending'
    });
};
