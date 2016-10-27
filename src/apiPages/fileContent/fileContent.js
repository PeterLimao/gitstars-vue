import Vue from 'vue';
import VueResource from 'vue-resource';
import Readme from 'components/readme';
import FilePanelFile from 'components/filePanelFile';
import Loading from 'components/loading';
import NotFound from 'components/notFound';
import FilePanelPic from 'components/filePanelPic';
import { Base64 } from 'js-base64';
import { setLang } from 'i18n';
import { getGithubFiles } from 'api';
import { getReadme } from 'api';
import { getContentHost } from 'api';
import 'directives';
import 'libs/materialize/css/materialize.min';
import '../../assets/style/base';

Vue.use(VueResource);

new Vue({
    el: 'body',
    data: {
        isReadme: false,
        isLoading: false,
        isNotFound: false,
        isPic: false,
        picSrc: '',
        owner: '',
        repo: '',
        notFoundType: 'noResult',
        fileContent: '',
        style: {
            'background': '#ffffff'
        }
    },
    ready () {
        const param = this.getParams();

        if (param.lang) {
            setLang(param.lang);
        }

        this.owner = param.owner;
        this.repo = param.repo;

        if (param.filePath) {
            this.getFile(param.owner, param.repo, decodeURI(param.filePath), param.anchor);
        } else {
            this.isReadme = true;
            this.getReadme(param.owner, param.repo);
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
        changeTitle (title) {
            document.title = title;
        },
        fileMsg (path) {
            const mdReg = /\.md$/;
            const picReg = /\.(png|jpg|jpeg|gif|bmp|webp)$/;
            const pathFrag = path.split('/');
            const fileName = pathFrag[pathFrag.length - 1];
            if (mdReg.test(fileName)) {
                return {
                    name: fileName,
                    type: 'md'
                };
            } else if (picReg.test(fileName)) {
                return {
                    name: fileName,
                    type: 'pic'
                };
            } else {
                return {
                    name: fileName,
                    type: 'file'
                };
            }
        },
        getReadme (owner, repo) {
            this.isLoading = true;
            getReadme({
                owner,
                repo
            }).then((response) => {
                return this.$http.get(response.data.url);
            }).then((response) => {
                this.isLoading = false;
                this.isReadme = true;

                this.$nextTick(() => {
                    this.$broadcast('loadReadme', Base64.decode(response.data.content));
                });
            }).catch(() => {
                this.isLoading = false;
                this.notFoundType = 'noReadme';
                this.isNotFound = true;
            });
        },
        getPic (filePath) {
            const pic = getContentHost() + '/' + this.owner + '/' + this.repo + '/master/' + filePath;
            this.picSrc = pic;
        },
        getFile (owner, repo, filePath, anchor) {
            const file = this.fileMsg(filePath);
            this.changeTitle(file.name);

            if (file.type === 'pic') {
                this.isPic = true;
                this.getPic(filePath);
                return;
            }

            this.isLoading = true;
            getGithubFiles({
                owner,
                repo,
                filePath
            }).then((response) => {
                this.isLoading = false;
                if (file.type === 'md') {
                    this.isReadme = true;

                    this.$nextTick(() => {
                        this.$broadcast('loadReadme', response.data, anchor);
                    });
                } else {
                    this.isReadme = false;

                    this.$nextTick(() => {
                        this.$broadcast('setFileView', response.data);
                    });
                }
            });
        }
    },
    components: {
        Readme,
        FilePanelFile,
        FilePanelPic,
        Loading,
        NotFound
    }
});
