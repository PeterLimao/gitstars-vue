<style scoped>
    /*基本样式*/
    #file-nav {
        position: fixed;
        right: 10px;
        bottom: 10px;
        background: #f9f9f9;
    }

    .file-icon {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        color: #fff;
        background: #673ab7;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom: 0;
        right: 0;
        transition: all 0.3s ease;
        z-index: 9999;
    }

    .file-panel {
        width: 0;
        height: 0;
        background: #fff;
        border-bottom-right-radius: 25px;
        transition: all 0.3s ease;
        background: #f9f9f9;
    }

    .file-panel-content {
        overflow-y: scroll;
        height: 100%;
        -webkit-overflow-scrolling : touch;
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
</style>
<template>
    <div id="file-nav">
        <div class="file-icon z-depth-1" :style="iconStyle" v-touch:tap="showFileNav">
            <i class="material-icons">folder</i>
        </div>
        <div class="file-panel z-depth-2" :style="panelStyle">
            <loading :loading-style="{position: 'absolute'}" v-if="isLoad"></loading>
            <div class="file-panel-content" v-if="isShowFileNav">
                <div class="file-panel-title">
                    <div class="file-panel-back-div z-depth-1" v-if="urlIndex" v-touch:tap="goBack">
                        <i class="material-icons">keyboard_backspace</i>
                    </div>
                    <span>{{filePath}}</span>
                </div>
                <div class="file-panel-list" v-if="!isShowDetailFile">
                    <div class="file-item" v-for="item in fileTree" v-touch:tap="openDetailNav(item)">
                        <i class="material-icons" v-show="isFolder(item.type)">folder_open</i>
                        <i class="material-icons" v-show="!isFolder(item.type)">content_copy</i>
                        <span>{{item.name}}</span>
                    </div>
                </div>
                <file-panel-file :file-content="fileContent" v-else></file-panel-file>
            </div>
        </div>
    </div>
</template>
<script>
    import Loading from 'components/loading';
    import Api from 'api';
    import FilePanelFile from 'components/filePanelFile';

    export default {
        data () {
            return {
                fileTree: '',
                isLoad: false,
                isShowDetailFile: false,
                isShowFileNav: false,
                isGoBack: false,
                urlIndex: 0,
                filePath: 'root',
                fileContent: '',
                backUrl: '',
                backName: '',
                backfilePath: '',
                panelStyle: {},
                iconStyle: {}
            }
        },
        methods: {
            isFolder: (type) => type === 'dir' ? true : false,
            showFileNav () {
                this.setPanelStyle();
                this.setIconStyle();
                this.getFileNav();
                this.isShowFileNav = !this.isShowFileNav;
                this.filePath = 'root';
                this.isShowDetailFile = false;
                this.$dispatch('isHiddenScroll', this.isShowFileNav);
            },
            setPanelStyle () {
                let panelWidth = !this.isShowFileNav ? (window.innerWidth - 20) + 'px' : 0;
                let panelHeight = !this.isShowFileNav ? (window.innerHeight - 70) + 'px' : 0;
                this.panelStyle = {
                    width: panelWidth,
                    height: panelHeight
                };
            },
            setIconStyle () {
                let iconColor = !this.isShowFileNav ? '#673ab7' : '#fff';
                let iconBg = !this.isShowFileNav ? '#fff' : '#673ab7';
                this.iconStyle = {
                    color: iconColor,
                    background: iconBg
                };
            },
            goBack () {
                this.isGoBack = true;
                if (this.urlIndex === 1) {
                    this.getFileNav();
                } else {
                    this.urlIndex--;
                    this.getSubFileNav(this.backName, this.backUrl);
                }
            },
            getFileNav() {
                if (this.isShowFileNav && !this.isGoBack) {
                    return;
                }
                this.urlIndex = 0;
                this.isLoad = true;
                Api.getRepoFiles({
                    owner: this.owner,
                    repo: this.repo
                }).then((response) => {
                    this.isLoad = false;
                    this.fileTree = response.data;
                    this.filePath = 'root';
                    this.isShowDetailFile = false;
                });
            },
            openDetailNav (item) {
                this.isGoBack = false;
                this.backfilePath = this.filePath;
                if (item.type === 'file') {
                    this.getDetailFile(item.name, item.download_url);
                } else {
                    this.getSubFileNav(item.name, item.url);
                    if (this.urlIndex % 2 === 0) {
                        this.backUrl = item.url;
                        this.backName = item.name;
                    }
                }
                this.urlIndex++;
            },
            getSubFileNav (name, path) {
                this.isLoad = true;
                this.$http.get(path).then((response) => {
                    this.isLoad = false;
                    this.fileTree = response.data;
                    this.isShowDetailFile = false;
                    if (this.isGoBack === false) {
                        this.filePath += '/' + name;
                    } else {
                        this.filePath = this.backfilePath;
                    }
                });
            },
            getDetailFile (name, path) {
                this.isLoad = true;
                this.$http.get(path).then((response) => {
                    this.isLoad = false;
                    this.filePath = name;
                    if (typeof response.data === 'object') {
                        response.data = JSON.stringify(response.data);
                    }
                    this.fileContent = response.data;
                    this.isShowDetailFile = true;
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
