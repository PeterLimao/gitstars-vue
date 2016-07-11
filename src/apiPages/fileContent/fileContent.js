import Vue from 'vue';
import VueResource from 'vue-resource';
import FilePanelFile from 'components/filePanelFile';
import Loading from 'components/loading';

Vue.use(VueResource);

new Vue({
    el: 'body',
    data: {
        fileContent: '',
    },
    ready () {
        this.$http.get(window.filePath).then((response) => {
            if (typeof response.data === 'object') {
                response.data = JSON.stringify(response.data);
            }
            this.fileContent = response.data;
        });
    },
    components: {
        FilePanelFile,
        Loading
    }
});
