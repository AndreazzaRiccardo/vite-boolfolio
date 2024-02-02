<script>
import axios from 'axios';
import ProjectCard from '../components/ProjectCard.vue';
import { store } from '../store';

export default {
    data() {
        return {
            store,
            page: 1,
            lastPage: Number
        }
    },
    created() {
        this.apiCall();
    },
    components: {
        ProjectCard
    },
    methods: {
        apiCall() {
            axios.get(`${this.store.serverUrl}/api/projects`, {
                params: {
                    page: this.page
                }
            })
                .then((resp) => {
                    this.store.projects = resp.data.results.data;
                    this.lastPage = resp.data.results.last_page;
                })
        },
        nextPage() {
            this.page++;
            this.apiCall();
        },
        backPage() {
            this.page--;
            this.apiCall();
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
                <div class="d-flex justify-content-end mb-4 gap-4">
                    <button v-if="page > 1" @click="backPage" class="btn btn-success">BACK</button>
                    <button v-if="page != lastPage" @click="nextPage" class="btn btn-success">NEXT</button>
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