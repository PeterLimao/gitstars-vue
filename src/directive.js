import Vue from 'vue';

export const lazy = () => {
    let nodeList = [];

    const imgStatus = {
        LOADING: 'loading',
        LOADED: 'loaded',
        ERROR: 'error'
    };

    const loadImgAsync = (item) => {
        let url = item.getAttribute('lazy-img');

        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;

            img.onload = () => {
                resolve(url);
            };

            img.error = () => {
                reject();
            };
        })
    };

    const scrollHandler = () => {
        nodeList.forEach((nodeitem) => {
            if (nodeitem.getBoundingClientRect().top >= (window.screen.availHeight - 100) || nodeitem.getBoundingClientRect().top <= 50) return;
            if (nodeitem.getAttribute('lazy-status')) return;

            let timeout = setTimeout(() => {
                nodeitem.setAttribute('lazy-status', imgStatus.LOADING);
                loadImgAsync(nodeitem).then((url) => {
                    nodeitem.setAttribute('src', url);
                    nodeitem.setAttribute('lazy-status', imgStatus.LOADED);
                    clearTimeout(timeout);
                }).catch(() => {
                    nodeitem.setAttribute('lazy-status', imgStatus.ERROR);
                    clearTimeout(timeout);
                });
            }, 300);
        });
    };

    const init = (rootDom) => {
        Vue.nextTick(() => {
            Array.prototype.forEach.call(rootDom.querySelectorAll('[lazy-img]'), (nodeitem) => {
                nodeList.push(nodeitem);
            });
            scrollHandler();
        });
        let MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
        let observer = new MutationObserver(nodeChangeHandler);
        observer.observe(rootDom, {childList: true,subtree: true});
    };

    const nodeChangeHandler = (records) => {
        if (!records[0].addedNodes[0]) return;
        nodeList = [];
        records.forEach((records) => {
            let addImgNode = records.addedNodes[0].querySelector('img');
            if (addImgNode.getAttribute('lazy-img')) {
                nodeList.push(addImgNode);
            }
        });
        scrollHandler();
    };

    return {
        bind () {
            this.el.addEventListener('scroll', scrollHandler);
            init(this.el);
        },
        update () {
            console.log(123);
        },
        unbind () {
            this.el.removeEventListener('scroll', scrollHandler);
        }
    }
};
