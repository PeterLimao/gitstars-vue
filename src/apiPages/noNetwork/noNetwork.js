import Vue from 'vue';
import NotFound from 'components/notFound';
import { setLang } from 'i18n';
import 'libs/materialize/css/materialize.min.css';
import '../../assets/style/base';

new Vue({
    el: 'body',
    components: {
        NotFound
    },
    data: {
        style: {
            'background': '#ffffff'
        },
        btnStyle: {
            background: '#7569b2',
            display: 'flex',
            margin: '20px auto',
            'text-transform': 'capitalize'
        }
    },
    ready () {
        const params = this.getParams();
        if (params.lang) {
            setLang(params.lang);
        }
    },
    methods: {
        getParams () {
            const paramObj = {};
            const search = decodeURI(window.location.search.replace(' ', ''));
            const paramStr = search.substring(1, search.length);
            paramStr.split('&').forEach((value) => {
                const kv = value.split('=');
                paramObj[kv[0]] = kv[1];
            });

            return paramObj;
        },
        refresh () {
            console.log('....window.webkit.messageHandlers.GitStars.postMessage');
            window.webkit.messageHandlers.GitStars.postMessage({
                type: 'refresh'
            });
        }
    }
});
