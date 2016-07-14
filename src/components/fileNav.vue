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
        color: #fff;
        background: #673ab7;
        display: flex;
        align-items: center;
        justify-content: center;
        bottom: 10px;
        right: 2.5%;
        transition: all 0.3s ease;
        z-index: 9999;
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
        right: 15%;
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
</style>
<template>
    <div id="file-nav">
        <div class="file-icon z-depth-1" :style="iconStyle" v-touch:tap="showFileNav">
            <i class="material-icons" v-if="isShowFileNav">clear</i>
            <i class="material-icons" v-else>list</i>
        </div>
        <div class="back-icon z-depth-1" v-touch:tap="goBack()" v-if="!isNotRoot" transition="back">
            <i class="material-icons">keyboard_backspace</i>
        </div>
        <div class="file-panel z-depth-1" :style="panelStyle">
            <loading v-if="isLoad"></loading>
            <div class="file-panel-content" v-if="isShowFileNav">
                <div class="file-panel-title">
                    <span>{{filePath}}</span>
                </div>
                <file-panel-file :file-content="fileContent" v-if="isShowDetailFile"></file-panel-file>
                <div class="file-panel-list" v-else>
                    <div class="file-item" v-for="item in fileTree" v-touch:tap="openDetailNav(item)">
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

    export default {
        data () {
            return {
                fileTree: '',
                isLoad: false,
                isShowFileNav: false,
                isShowDetailFile: false,
                isFirstBack: true,
                fileDeep: [],
                filePath: 'root',
                fileContent: '',
                panelStyle: {},
                iconStyle: {}
            }
        },
        computed: {
            isNotRoot () {
                return this.filePath === 'root';
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
                this.filePath = 'root';
                this.fileTree = '';
                this.fileContent = '';
                this.isShowDetailFile = false;
                this.fileTree = '';
                this.fileDeep = [];
                this.isLoad = false;
                this.isFirstBack = true;
            },
            setPanelStyle () {
                let panelHeight = this.isShowFileNav ? (window.innerHeight - 70) + 'px' : 0;
                this.panelStyle = {
                    height: panelHeight
                };
            },
            setIconStyle () {
                let iconColor = this.isShowFileNav ? '#673ab7' : '#fff';
                let iconBg = this.isShowFileNav ? '#fff' : '#673ab7';
                this.iconStyle = {
                    color: iconColor,
                    background: iconBg
                };
            },
            getFileNav() {
                this.isLoad = true;
                getRepoFiles({
                    owner: this.owner,
                    repo: this.repo
                }).then((response) => {
                    this.isLoad = false;
                    this.fileTree = response.data;
                });
            },
            goBack () {
                if (this.isFirstBack) {
                    this.fileDeep.pop();
                    this.isFirstBack = false;
                }
                if (this.fileDeep.length === 0) {
                    this.initData();
                    this.getFileNav();
                } else {
                    let itemObj = this.fileDeep.pop();
                    this.getSubFileNav(itemObj.backName, itemObj.backUrl, () => {
                        this.filePath = itemObj.backFilePath;
                    });
                }
            },
            openDetailNav (item) {
                if (item.type === 'file') {
                    this.getDetailFile(item.name, item.download_url, () => {
                        this.fileDeep.push({
                            backUrl: item.download_url,
                            backName: item.name,
                            backFilePath: this.filePath
                        });
                    });
                } else {
                    this.getSubFileNav(item.name, item.url, () => {
                        this.fileDeep.push({
                            backUrl: item.url,
                            backName: item.name,
                            backFilePath: this.filePath
                        });
                    });
                }
            },
            getSubFileNav (name, path, callback) {
                this.isLoad = true;
                this.$http.get(path).then((response) => {
                    this.isLoad = false;
                    this.fileTree = response.data;
                    this.filePath += '/' + name;
                    this.isShowDetailFile = false;
                    if (callback) callback();
                });
            },
            getDetailFile (name, path, callback) {
                this.isLoad = true;
                this.$http.get(path).then((response) => {
                    this.isLoad = false;
                    this.filePath = name;
                    if (typeof response.data === 'object') {
                        response.data = JSON.stringify(response.data);
                    }
                    this.fileContent = response.data;
                    this.isShowDetailFile = true;
                    if (callback) callback();
                });
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
            FilePanelFile
        }
    }
</script>
