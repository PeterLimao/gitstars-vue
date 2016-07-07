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
        width: 100%;
        height: 100%;
        background: #fff;
        border-bottom-right-radius: 25px;
        transition: all 0.3s ease;
        background: #f9f9f9;
    }

    .file-panel-content {
        overflow-y: scroll;;
        height: 100%;
        -webkit-scroll-touch: true;
    }

    .file-panel-content h3 {
        color: #673ab7;
        text-align: center;
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
                <h3>{{filePath}}</h3>
                <div class="file-item" v-for="item in fileTree">
                    <i class="material-icons" v-show="isFolder(item.type)">folder_open</i>
                    <i class="material-icons" v-show="!isFolder(item.type)">content_copy</i>
                    <span>{{item.name}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Loading from 'components/loading';
    import Actions from 'actions';
    import Api from 'api';

    export default {
        data () {
            return {
                fileTree: '',
                isLoad: false,
                isShowFileNav: false,
                filePath: 'root',
                panelStyle: {
                    width: 0,
                    height: 0
                },
                iconStyle: {
                    color: '#fff',
                    background: '#673ab7'
                }
            }
        },
        methods: {
            isFolder (type) {
                return type === 'dir' ? true : false;
            },
            showFileNav () {
                this.setPanelStyle();
                this.setIconStyle();
                this.getFileNav();
                this.isShowFileNav = !this.isShowFileNav;
            },
            setPanelStyle () {
                let panelWidth = !this.isShowFileNav ? (window.innerWidth - 20) + 'px' : 0;
                let panelHeight = !this.isShowFileNav ? (window.innerHeight - 70) + 'px' : 0;
                this.panelStyle = {width: panelWidth, height: panelHeight};
            },
            setIconStyle () {
                let iconColor = !this.isShowFileNav ? '#673ab7' : '#fff';
                let iconBg = !this.isShowFileNav ? '#fff' : '#673ab7';
                this.iconStyle = {color: iconColor, background: iconBg};
            },
            getFileNav() {
                if (this.isShowFileNav) {
                    return;
                }
                this.isLoad = true;
                Api.getRepoFiles({
                    owner: this.owner,
                    repo: this.repo
                }).then((response) => {
                    this.isLoad = false;
                    this.fileTree = response.data;
                });
            }
        },
        props: ['owner', 'repo'],
        components: {
            Loading
        }
    }
</script>
