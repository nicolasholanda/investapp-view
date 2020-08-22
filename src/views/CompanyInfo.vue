<template>
    <div>
        <div v-if="!error && !loading">
            <md-card>
                <md-card-header>
                    <div class="md-title">{{company.name}}</div>
                    <div class="md-subhead">{{company.currency}}</div>
                </md-card-header>

                <md-card-content>
                    <div class="md-layout">
                        <span class="md-layout md-body-2" style="font-weight: bold;">Setor</span>
                    </div>
                    <div class="md-layout">
                        {{company.sector}}
                    </div>
                    <div class="md-layout">
                        <span class="md-layout md-body-2" style="font-weight: bold;">Indústria</span>
                    </div>
                    <div class="md-layout">
                        {{company.industry}}
                    </div>
                    <div class="md-layout">
                        <span class="md-layout md-body-2" style="font-weight: bold;">Endereço</span>
                    </div>
                    <div class="md-layout">
                        {{company.address}}
                    </div>
                    <div class="md-layout">
                        <span class="md-layout md-body-2" style="font-weight: bold;">Descrição</span>
                    </div>
                    <div class="md-layout">
                        {{company.description}}
                    </div>
                </md-card-content>
            </md-card>
        </div>

        <div id="spinner" v-show="loading">
            <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
        </div>

        <div id="errorMessage" v-show="error">
            <h1>{{errorMessage}}</h1>
            <a @click="fetchCompany">Tentar novamente.</a>
        </div>
    </div>
</template>

<script>
    import {getCompanyOverview as getCompanyOverview} from "../services/stockExchangeService"
    import {getErrorMessage} from "@/utils/errorUtil";

    export default {
        name: "CompanyInfo",
        props: [
            "symbol"
        ],
        data() {
            return {
                company: {},
                error: false,
                loading: false,
                errorMessage: "Ocorreu um erro.",
            }
        },
        methods: {
            setError(error) {
                this.error = true;
                this.loading = false;
                this.errorMessage = getErrorMessage(error?.code);
            },
            fetchCompany() {
                this.loading = true;
                this.error = false;

                getCompanyOverview(this.symbol).then(response => {
                    this.company = response.data
                    this.error = false;
                    this.loading = false;
                }, error => {
                    this.setError(error.response?.data)
                })
            }
        },
        created() {
            this.fetchCompany();
        },
        watch: {
            symbol() {
                this.fetchCompany();
            }
        }
    }
</script>

<style scoped>
    #errorMessage {
        justify-content: center;
        margin-top: 30vh;
    }

    #errorMessage h1 {
        margin: 20px auto;
        text-align: center;
    }

    #errorMessage a {
        display: block;
        text-align: center;
        cursor: pointer;
    }

    #spinner {
        display: flex;
        justify-content: center;
        margin-top: 30vh;
    }

    .md-layout {
        margin-top: 5px;
    }
</style>
