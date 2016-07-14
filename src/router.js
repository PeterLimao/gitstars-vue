/**
 * router
 */
export default (router) => {
    router.map({
        '*': {
            component: require('components/homePanel')
        },
        '/': {
            component: require('components/homePanel')
        },
        '/home': {
            component: require('components/homePanel')
        },
        '/search': {
            component: require('components/searchPanel')
        },
        '/more': {
            component: require('components/morePanel')
        },
        '/detail/*name': {
            component: require('components/readmeDetail')
        }
    });
};
