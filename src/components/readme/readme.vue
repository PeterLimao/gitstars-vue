<style lang="less">
    @import '~highlightjs/styles/github.css';

    #readme {
        margin: 0 10px;
        overflow-x: hidden;
        word-wrap: break-word;
        padding: 10px 0;
    }

    .markdown-detail {
        padding: 0 10px;
        pre {
            word-wrap: normal;
            overflow-x: scroll;
            text-indent: 0rem;
            padding: 10px;
            background: #f1f1f1;
        }
    }

    img {
        max-width: 100%;
    }

    h1 {
        font-size: 2rem;
    }

    h2 {
        font-size: 1.5rem;
    }

    h3 {
        font-size: 1rem;
    }

    h4 {
        font-size: 1rem;
    }
</style>
<template>
    <div id="readme">
        <article class="markdown-detail" v-else>
            {{{ markdownHtml }}}
        </article>
    </div>
</template>
<script>
    import { getContentHost } from 'api';
    import { getGitHost } from 'api';
    import Hljs from 'highlightjs/highlight.pack.min';
    import Marked from 'libs/marked/marked';

    export default {
        data () {
            return {
                markdownHtml: ''
            };
        },
        ready () {
            Marked.setOptions({
                highlight (code) {
                    return Hljs.highlightAuto(code).value;
                }
            });
        },
        methods: {
            loadData (content, anchor) {
                this.markdownHtml = Marked(content);
                const t = setTimeout(() => {
                    this.replaceImg();
                    if (this.useType === 'api') {
                        this.replaceHrefForApi();
                    } else {
                        this.replaceHref();
                    }

                    if (anchor) {
                        const dom = this.$el.querySelector('.markdown-detail').querySelector('#-' + anchor);
                        dom.scrollIntoView();
                    }
                    clearTimeout(t);
                });
            },
            replaceImg () {
                const imgList = this.$el.querySelector('.markdown-detail').querySelectorAll('img');

                Array.prototype.forEach.call(imgList, (img) => {
                    let src = img.getAttribute('src');

                    if (this.startWith(src, 'http://') || this.startWith(src, 'https://')) {
                        if (/\/blob/.test(src)) {
                            src = src.replace('/blob', '/raw');
                        }
                    } else {
                        if (this.startWith(src, './')) src = src.substring(1, src.length);
                        src = getContentHost() + '/' + this.owner + '/' + this.repo + '/master' + src;
                    }
                    img.src = src;
                });
            },
            replaceHref () {
                const aList = this.$el.querySelector('.markdown-detail').querySelectorAll('a');

                Array.prototype.forEach.call(aList, (a) => {
                    let href = a.getAttribute('href');

                    if (!this.startWith(href, 'http://') && !this.startWith(href, 'https://')) {
                        if (this.startWith(href, '#')) {
                            return;
                        }
                        if (this.startWith(href, './')) {
                            href = getGitHost + '/' + this.owner + '/' + this.repo + '/blob/master' + href.substring(1, href.length);
                        } else if (this.startWith(href, '/')) {
                            href = getGitHost + '/' + this.owner + '/' + this.repo + '/blob/master' + href;
                        } else {
                            href = getGitHost() + '/' + this.owner + '/' + this.repo + '/blob/master/' + href;
                        }
                        a.href = href;
                    }
                });
            },
            replaceHrefForApi () {
                const aList = this.$el.querySelector('.markdown-detail').querySelectorAll('a');

                Array.prototype.forEach.call(aList, (a) => {
                    let href = a.getAttribute('href');

                    if (!this.startWith(href, 'http://') && !this.startWith(href, 'https://')) {
                        if (this.startWith(href, '#') || this.startWith(href, '/')) {
                            return;
                        }
                        if (this.startWith(href, './')) {
                            href = './fileContent.html?owner=' + this.owner + '&repo=' + this.repo + '&filePath=' + href.substring(2, href.length);
                        } else {
                            href = './fileContent.html?owner=' + this.owner + '&repo=' + this.repo + '&filePath=' + href;
                        }
                        a.href = href;
                    } else if (/blob\/master/.test(href)) {
                        const index = href.indexOf('master/');
                        const filePath = href.substring(index).substring(7);
                        if (filePath.indexOf('#')) {
                            href = './fileContent.html?owner=' + this.owner + '&repo=' + this.repo + '&filePath=' + filePath.split('#')[0] + '&anchor=' + filePath.split('#')[1];
                        } else {
                            href = './fileContent.html?owner=' + this.owner + '&repo=' + this.repo + '&filePath=' + filePath;
                        }
                        a.href = href;
                    }
                });
            },
            startWith (str, param) {
                const reg = new RegExp('^' + param);
                return reg.test(str);
            }
        },
        events: {
            loadReadme (content, anchor) {
                this.loadData(content, anchor);
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
            },
            useType: {
                type: String,
                default: 'app'
            }
        }
    };
</script>
