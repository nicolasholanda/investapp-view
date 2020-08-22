import Vue from 'vue';
import Router from 'vue-router'
import TimeSeries from "@/views/TimeSeries";
import NotFound from "@/views/NotFound";
import CompanySearch from "@/views/CompanySearch";

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '*',
            component: NotFound
        },
        {
            path: '/bovespa',
            component: TimeSeries,
            props: {symbol: 'IBM'}
        },
        {
            path: '/empresas',
            component: CompanySearch
        },
        {
            path: '/',
            redirect: '/bovespa'
        }
    ]
})
