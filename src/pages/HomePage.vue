<script>
import axios from 'axios';
import ProjectCard from '../components/ProjectCard.vue';
import { store } from '../store';

export default {
    data() {
        return {
            store,
            lastPage: Number,
            currPage: 1
        }
    },
    created() {
        this.apiCall();
    },
    components: {
        ProjectCard
    },
    methods: {
        apiCall(numPage) {
            axios.get(`${this.store.serverUrl}/api/projects`, {
                params: {
                    page: numPage
                }
            })
                .then((resp) => {
                    this.store.projects = resp.data.results.data;
                    this.lastPage = resp.data.results.last_page;
                    this.currPage = resp.data.results.current_page
                })
        },
    }
}
</script>

<template>
    <main>
        <div class="container py-5 text-center">

            <div v-if="store.notFound === true">
                <h1 class="text-light">PROJECT NOT FOUND</h1>
            </div>

            <div v-else>
                <h1 class="text-light mb-5">PROJECTS LIST</h1>
                <div v-if="store.btnPage" class="d-flex justify-content-end mb-4 gap-4">
                    <button :disabled="currPage === 1" @click="apiCall(currPage - 1)" class="btn btn-success">PREV</button>
                    <button  class="btn" :class="{ 'btn-primary': page === currPage, 'btn-success': page !== currPage }" @click="apiCall(page)" v-for="page in lastPage">{{ page }}</button>
                    <button :disabled="currPage === lastPage" @click="apiCall(currPage + 1)"
                        class="btn btn-success">NEXT</button>
                </div>

                <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-3">
                    <div v-for="project in store.projects" :key="project.id" class="col">
                        <ProjectCard :project="project" />
                    </div>
                </div>
            </div>

        </div>
    </main>
</template>

<style lang="scss" scoped></style>