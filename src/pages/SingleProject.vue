<script>
import axios from 'axios';
import { store } from '../store';

export default {
    data() {
        return {
            store,
            project: null,
            loading: true
        }
    },
    created() {
        axios.get(`${store.serverUrl}/api/projects/${this.$route.params.slug}`)
            .then((resp) => {
                this.project = resp.data.results;
            })
            .finally(() => {
                this.loading = false
            })
    },
    computed: {
        formatDate() {
            if (this.project)
                return new Date(this.project.created_at).toLocaleDateString();
        }
    }
}
</script>

<template>
    <main>
        <div class="container py-5">

            <h1 class="text-center text-light" v-if="loading">Loading...</h1>

            <div v-else class="fs-5 text-light">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <div class="d-flex align-items-center flex-wrap">
                            <h2>{{ project.name }}</h2>
                            <div v-for="technology in project.technologies" id="badge">
                                <span class="ms-4 badge text-dark" :style="`background-color: ${technology.hex_color}`">{{
                                    technology.name }}</span>
                                <p
                                    class="text-light card bg-dark card-body position-absolute w-25 mt-2 d-none badge-description">
                                    {{ technology.description }}</p>
                            </div>
                        </div>
                        <p>{{ project.slug }}</p>
                    </div>

                    <!-- Back Button -->
                    <router-link class="btn btn-success" :to="{ name: 'home' }">BACK</router-link>
                </div>

                <div>
                    <img v-if="project.cover_image" style="max-width:600px;"
                        :src="`${store.serverUrl}/storage/${project.cover_image}`" alt="">
                    <p class="mt-5 text-secondary" v-else>IMAGE NOT AVAILABLE</p>
                </div>

                <hr>

                <div class="mt-4">
                    <strong>Link: </strong>
                    <a class="text-danger" :href="`${project.link}`">{{ project.link }}</a>
                </div>

                <div v-if="project.type" class="mt-4">
                    <strong>Type: </strong>
                    <button class="btn border text-light" type="button" data-bs-toggle="collapse"
                        data-bs-target="#description-collaps" aria-expanded="false" aria-controls="description-collaps">
                        {{ project.type.name }}
                    </button>
                    <div v-if="project.type.description" class="collapse mt-2 text-dark" id="description-collaps">
                        <div class="card card-body">
                            {{ project.type.description }}
                        </div>
                    </div>
                </div>

                <div v-if="project.description" class="mt-4">
                    <strong>Description: </strong>
                    {{ project.description }}
                </div>

                <div class="mt-4">
                    <strong>Upload Date: </strong>
                    {{ formatDate }}
                </div>
            </div>

        </div>
    </main>
</template>

<style lang="scss"></style>
