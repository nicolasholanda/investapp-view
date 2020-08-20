import Vue from 'vue';
import Router from 'vue-router'
import Bovespa from "@/views/Bovespa";
import NotFound from "@/views/NotFound";

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '*',
            component: NotFound
        },
        {
            path: '/',
            component: Bovespa
        }
    ]
})
