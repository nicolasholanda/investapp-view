<template>
    <div>
        <md-autocomplete v-model="keywords" :md-options="searchResult" @md-changed="searchCompanies"
                         @md-selected="selectCompany" @md-opened="searchCompanies">
            <label>Buscar empresas</label>
            <template slot="md-autocomplete-item" slot-scope="{ item : company }">
                {{company.symbol}}
            </template>
        </md-autocomplete>
        <md-tabs class="md-primary" md-alignment="centered">
            <md-tab id="tab-pages" md-label="Informações">
                <CompanyInfo :symbol="symbol"/>
            </md-tab>
            <md-tab id="tab-home" md-label="Valor">
                <TimeSeries :symbol="symbol"/>
            </md-tab>
        </md-tabs>
    </div>
</template>

<script>
    import TimeSeries from "@/views/TimeSeries";
    import {searchCompany as searchCompany} from  '../services/stockExchangeService'
    import CompanyInfo from "@/views/CompanyInfo";
    export default {
        name: "CompanySearch",
        components: {CompanyInfo, TimeSeries},
        data() {
            return {
                symbol: 'IBM',
                keywords: 'IBM',
                company: {},
                searchResult: []
            }
        },
        methods: {
            searchCompanies() {
                searchCompany(this.keywords).then(response => {
                    this.searchResult = response.data.items
                })
            },
            selectCompany(company) {
                this.symbol = company.symbol;
                this.keywords = company.symbol;
                this.company = company;
            }
        }
    }
</script>

<style scoped>

</style>
