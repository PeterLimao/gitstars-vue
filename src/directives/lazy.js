import Vue from 'vue';
import loadingImg from 'assets/img/9.pic.jpg';

let nodeList = [];

const init = function (rootDom) {
    Vue.nextTick(() => {
        Array.prototype.forEach.call(rootDom.querySelectorAll('[lazy-img]'), (nodeitem) => {
            nodeList.push(nodeitem);
        });
        scrollHandler();
    });
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    const observer = new MutationObserver(nodeChangeHandler);
    observer.observe(rootDom, { childList: true, subtree: true });
};

const imgStatus = {
    LOADING: 'loading',
    LOADED: 'loaded',
    ERROR: 'error'
};

const loadImgAsync = (item) => {
    const url = item.getAttribute('lazy-img');

    return new Promise((resolve, reject) => {
        const img = new window.Image();
        img.src = url;

        img.onload = () => {
            resolve(url);
        };

        img.error = () => {
            reject();
        };
    });
};

const scrollHandler = () => {
    nodeList.forEach((nodeitem) => {
        if (!nodeitem.getAttribute('src')) {
            nodeitem.setAttribute('src', loadingImg);
        }
        if (nodeitem.getBoundingClientRect().top >= (window.screen.availHeight - 100) || nodeitem.getBoundingClientRect().top <= 50) return;
        if (nodeitem.getAttribute('lazy-status')) return;

        const timeout = setTimeout(() => {
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

const nodeChangeHandler = (records) => {
    if (!records[0].addedNodes[0]) return;
    nodeList = [];
    records.forEach((records) => {
        const addImgNode = records.addedNodes[0].querySelector('img');
        if (addImgNode.getAttribute('lazy-img')) {
            nodeList.push(addImgNode);
        }
    });
    scrollHandler();
};

const lazy = {
    bind () {
        this.el.addEventListener('scroll', scrollHandler);
        init(this.el);
    },
    unbind () {
        this.el.removeEventListener('scroll', scrollHandler);
    }
};

export default lazy;
