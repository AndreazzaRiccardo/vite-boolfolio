<script>
import { store } from '../store';
import axios from 'axios';

export default {
    data() {
        return {
            store,
            user: null,
            loading: true
        }
    },
    created() {
        this.apiCall();
    },
    methods: {
        apiCall() {
            axios.get(`${this.store.serverUrl}/api/user`)
                .then((resp) => {
                    this.user = resp.data.results;
                })
                .finally(() => {
                    this.loading = false;
                })
        },
    }
}
</script>

<template>
    <main>
        <div class="container text-light fs-5 py-5">

            <div v-if="loading"></div>
            <div v-else>
                <h1 class="text-center mb-5">About Me</h1>
                <p><strong>Name: </strong> {{ user.name }}</p>
                <p><strong>E-Mail: </strong> {{ user.email }}</p>
            </div>

        </div>
    </main>
</template>

<style lang="scss"></style>
