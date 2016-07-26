<style scoped>
    /*基本样式*/
    #file-nav {
        position: fixed;
        right: 0px;
        bottom: 0px;
        width: 100%;
        background: #f9f9f9;
    }

    .file-icon {
        position: absolute;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #673ab7;
        display: flex;
        align-items: center;
        justify-content: center;
        bottom: 10px;
        right: 2.5%;
        transition: all 0.3s ease;
        z-index: 9999;
        padding: 10px 5px 6px;
    }

    .back-icon {
        position: absolute;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        color: #fff;
        background: #673ab7;
        display: flex;
        align-items: center;
        justify-content: center;
        bottom: 10px;
        right: 16%;
        z-index: 9999;
    }

    .file-panel {
        margin: 0 auto;
        width: 95%;
        height: 0;
        background: #fff;
        transition: all 0.2s ease;
        background: #f9f9f9;
    }

    .file-panel-content {
        height: 100%;
    }

    .file-panel-content h3 {
        color: #673ab7;
        margin: 10px 10px;
    }

    .file-panel-back-div {
        position: absolute;
        left: 10px;
        top: 5px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f9f9f9;
        z-index: 10;
    }

    .file-panel-title {
        width: 100%;
        display: flex;
        height: 50px;
        color: #673ab7;
        align-items: center;
        justify-content: center;
        background: #f9f9f9;
        z-index: 10;
    }

    .file-panel-list {
        -webkit-overflow-scrolling : touch;
        overflow-y: scroll;
        height: 90%;
    }

    .file-item {
        display: flex;
        align-items: center;
        height: 65px;
        border-top: 1px solid rgba(160, 160, 160, 0.2);
        margin: 0 10px;
        color: #757575;
        font-size: 15px;
    }

    .file-item span {
        margin-left: 5px;
    }

    /*动态样式*/
    .back-transition {
        transition: all 0.3s ease;
        opacity: 1;
    }

    .back-enter, .back-leave {
        opacity: 0;
        transform: translateX(100%);
    }

    /*动态样式*/
    .list-transition {
        transition: all 0.3s ease;
    }

    .list-enter, .list-leave {
        transform: translateX(-100%);
    }
</style>
<template>
    <div id="file-nav">
        <div class="file-icon z-depth-1" :style="iconStyle" v-touch:tap="showFileNav">
            <icon-transition :color="iconTransitionColor" :type="iconTransitionType"></icon-transition>
        </div>
        <div class="back-icon z-depth-1" v-touch:tap="goBack()" v-if="fileIndex > 1" transition="back">
            <i class="material-icons">keyboard_backspace</i>
        </div>
        <div class="file-panel z-depth-1" :style="panelStyle">
            <loading v-if="isLoad"></loading>
            <div class="file-panel-content" v-if="isShowFileNav">
                <div class="file-panel-title">
                    <span>{{filePath}}</span>
                </div>
                <file-panel-file :file-content="fileContent" v-if="isShowDetailFile" transition="list"></file-panel-file>
                <file-panel-pic :pic-src="fileSrc" v-if="isShowDetailPic" transition="list"></file-panel-pic>
                <div class="file-panel-list" v-if="!isShowDetailFile && !isShowDetailPic">
                    <div class="file-item" v-for="item in fileList" v-touch:tap="openDetailNav(item)" transition="list">
                        <i class="material-icons" v-show="isFolder(item.type)">folder_open</i>
                        <i class="material-icons" v-show="!isFolder(item.type)">content_copy</i>
                        <span>{{item.name}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Loading from 'components/loading';
    import {getRepoFiles} from 'api';
    import FilePanelFile from 'components/filePanelFile';
    import FilePanelPic from 'components/filePanelPic';
    import IconTransition from 'components/iconTransition';

    export default {
        data () {
            return {
                fileTree: {},
                fileList: [],
                fileIndex: 0,
                isLoad: false,
                isShowFileNav: false,
                isShowDetailFile: false,
                isShowDetailPic: false,
                filePath: '',
                fileContent: '',
                fileSrc: '',
                panelStyle: {},
                iconStyle: {},
                iconTransitionColor: '#fff',
                iconTransitionType: 'menu'
            }
        },
        methods: {
            isFolder: (type) => type === 'dir',
            showFileNav () {
                this.isShowFileNav = !this.isShowFileNav;
                this.initData();
                this.setPanelStyle();
                this.setIconStyle();
                this.$dispatch('isHiddenScroll', this.isShowFileNav);
                if (this.isShowFileNav) {
                    this.getFileNav(false);
                }
            },
            initData () {
                this.filePath = '';
                this.fileTree = {};
                this.fileList = [];
                this.fileIndex = 0;
                this.fileContent = '';
                this.fileSrc = '';
                this.isShowDetailFile = false;
                this.isShowDetailPic = false;
                this.isLoad = false;
            },
            setPanelStyle () {
                let panelHeight = this.isShowFileNav ? (window.innerHeight - 70) + 'px' : 0;
                this.panelStyle = {
                    height: panelHeight
                };
            },
            setIconStyle () {
                this.iconTransitionColor = this.isShowFileNav ? '#673ab7' : '#fff';
                this.iconTransitionType = this.isShowFileNav ? 'cancle' : 'menu';
                let iconBg = this.isShowFileNav ? '#fff' : '#673ab7';
                this.iconStyle = {
                    background: iconBg
                };
            },
            goBack () {
                this.fileIndex--;
                this.fileList = this.fileTree[this.fileIndex].data;
                this.filePath = this.fileTree[this.fileIndex].path;
                this.isShowDetailFile = false;
                this.isShowDetailPic = false;
            },
            setFileTree (path, data) {
                this.fileIndex++;
                this.$set('fileTree[' + this.fileIndex + '].path', path);
                this.$set('fileTree[' + this.fileIndex + '].data', data);
                this.fileList = this.fileTree[this.fileIndex].data;
                this.filePath = this.fileTree[this.fileIndex].path;
            },
            getFileNav() {
                this.isLoad = true;
                getRepoFiles({
                    owner: this.owner,
                    repo: this.repo
                }).then((response) => {
                    this.isLoad = false;
                    this.setFileTree('root', response.data);
                });
            },
            openDetailNav (item) {
                if (item.type === 'file') {
                    this.getDetailFile(item.name, item.download_url);
                } else {
                    this.getSubFileNav(item.name, item.url);
                }
            },
            getSubFileNav (name, path) {
                this.isLoad = true;
                this.$http.get(path).then(() => {
                    this.isLoad = false;
                    this.isShowDetailFile = false;
                    this.isShowDetailPic = false;
                    this.setFileTree(this.filePath += '/' + name, response.data);
                });
            },
            getDetailFile (name, path) {
                let showPicRegExp = /\.(png|jpeg|jpg|gif)/g;
                let downLoadRegExp = /\.(pdf|m4a)/g;

                if (showPicRegExp.test(name)) {
                    this.showPic(name, path);
                } else if (downLoadRegExp.test(name)) {
                    this.downloadFile(name, path);
                } else {
                    this.showCode(name, path);
                }
            },
            showCode (name, path, callback) {
                this.isLoad = true;
                this.$http.get(path).then(() => {
                    this.fileIndex++;
                    if (typeof response.data === 'object') {
                        response.data = JSON.stringify(response.data);
                    }
                    this.isLoad = false;
                    this.filePath = name;
                    this.fileContent = response.data;
                    this.isShowDetailFile = true;
                    this.isShowDetailPic = false;
                });
            },
            downloadFile (name, path) {
                let link = document.createElement('a');
                let event = document.createEvent('HTMLEvents');
                event.initEvent('click', false, false);
                link.download = name;
                link.href = path;
                link.dispatchEvent(event);
            },
            showPic (name, path, callback) {
                this.fileIndex++;
                this.isShowDetailPic = true;
                this.isShowDetailFile = false;
                this.fileSrc = path;
                this.filePath = name;
            }
        },
        props: {
            owner: {
                type: String,
                required: true
            },
            repo: {
                type: String,
                required: true
            }
        },
        components: {
            Loading,
            FilePanelFile,
            FilePanelPic,
            IconTransition
        }
    }
</script>
