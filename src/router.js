/**
 * router
 */
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
        }
    });
};
