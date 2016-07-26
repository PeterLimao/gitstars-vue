/**
 * filter.js
 * @author PeterL
 */
import State from 'state';

export default (router) => {
    router.map({
        '*': {
            component (resolve) {
                require(['view/trendingPanel'], resolve);
            }
        },
        '/': {
            component (resolve) {
                require(['view/trendingPanel'], resolve);
            }
        },
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

    router.beforeEach(({to, next}) => {
        if (/(detail)/g.test(to.path)) {
            State.isLoad = true;
        }
        next();
    });

    router.afterEach(({to}) => {
        if (/(detail)/g.test(to.path)) {
            State.isLoad = false;
        }
    });
};
