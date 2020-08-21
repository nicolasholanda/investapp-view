<template>
    <md-app>
        <md-app-drawer class="md-elevation-2" md-permanent="clipped">
            <md-list>
                <md-list-item v-for="page in pages" :key="page.id" :to="page.path">
                    <md-icon style="margin-right: 10px">{{page.icon}}</md-icon>
                    <span class="md-list-item-text">{{page.title}}</span>
                </md-list-item>
            </md-list>
        </md-app-drawer>

        <md-app-content>
            <transition mode="out-in">
                <router-view/>
            </transition>
        </md-app-content>
    </md-app>
</template>

<script>
    export default {
        name: "TheBody",
        data() {
            return {
                pages: [
                    {
                        id: 1,
                        icon: "bar_chart",
                        title: "Pontuação Bovespa",
                        path: "/"
                    },
                ]
            };
        }
    }
</script>

<style lang="scss" scoped>
    .md-app-drawer {
        width: 230px;
        max-width: calc(100vw - 125px);
    }

    .md-list-item {
        transition: 0.3s;
    }

    .md-list-item:hover {
        cursor: pointer;
        background-color: #ededed;
    }

    .router-link-active {
        background-color: #ededed;
    }

    .md-app {
        min-height: 100%;
    }
</style>
