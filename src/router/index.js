import Vue from 'vue';
import VueRouter from 'vue-router';
import Store from 'store';

Vue.use(VueRouter);

const router = new VueRouter();

router.map({
    '*': {
        component (resolve) {
            require(['pages/trendingPage'], resolve);
        }
    },
    '/trending': {
        component (resolve) {
            require(['pages/trendingPage'], resolve);
        }
    },
    '/search': {
        component (resolve) {
            require(['pages/searchPage'], resolve);
        }
    },
    '/stars': {
        component (resolve) {
            require(['pages/starsPage'], resolve);
        }
    },
    '/detail/*name': {
        component (resolve) {
            require(['pages/readmePage'], resolve);
        }
    }
});

router.beforeEach(({ from, to, next }) => {
    if (/(detail)/g.test(to.path)) {
        Store.dispatch('setLoad', {
            isLoad: true
        });
    }
    if (from.path === undefined && to.path !== '/trending') {
        router.replace('/trending');
    }
    next();
});

router.afterEach(({ to }) => {
    if (/(detail)/g.test(to.path)) {
        Store.dispatch('setLoad', {
            isLoad: false
        });
    }
});

const start = function (component, tag) {
    router.start(component, tag);
};

export { start };
