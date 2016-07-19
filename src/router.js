/**
 * filter.js
 * @author PeterL
 */
import State from 'state';


export default (router) => {
    router.map({
        '*': {
            component (resolve) {
                require(['components/homePanel'], resolve);
            }
        },
        '/': {
            component (resolve) {
                require(['components/homePanel'], resolve);
            }
        },
        '/home': {
            component (resolve) {
                require(['components/homePanel'], resolve);
            }
        },
        '/search': {
            component (resolve) {
                require(['components/searchPanel'], resolve);
            }
        },
        '/more': {
            component (resolve) {
                require(['components/morePanel'], resolve);
            }
        },
        '/detail/*name': {
            component (resolve) {
                require(['components/readmeDetail'], resolve);
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
