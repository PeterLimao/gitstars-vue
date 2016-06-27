<style scoped>
    #list-content {
        padding: 50px 10px;
    }
</style>
<template>
    <section id="list-content">
        <div class="card" v-for="item in trendingList">
            <div class="card-content">
                Limao
            </div>
        </div>
    </section>
</template>
<script>
    export default {
        data () {
            return {

            }
        },
        vuex: {
            getters: {
                trendingList (state) {
                    return state.trendingList;
                }
            }
        }
    };
</script>
