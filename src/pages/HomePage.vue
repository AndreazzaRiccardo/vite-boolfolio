<script>
import axios from 'axios';
import ProjectCard from '../components/ProjectCard.vue';
import { store } from '../store';

export default {
    data() {
        return {
            store,
            lastPage: Number,
            currPage: 1,
            types: [],
            selectType: ''
        }
    },
    created() {
        this.apiCall();
        this.getTypes();
    },
    components: {
        ProjectCard
    },
    methods: {
        apiCall(numPage) {
            let params;
            if (this.selectType != '') {
                params = {
                    page: numPage,
                    type_id: this.selectType
                }
            } else {
                params = {
                    page: numPage
                }
            }
            axios.get(`${this.store.serverUrl}/api/projects`, {params})
                .then((resp) => {
                    this.store.projects = resp.data.results.data;
                    this.lastPage = resp.data.results.last_page;
                    this.currPage = resp.data.results.current_page
                })
        },
        getTypes() {
            axios.get(`${this.store.serverUrl}/api/types`)
                .then((resp) => {
                    this.types = resp.data.results;
                })
        }
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
                <div class="d-flex align-items-end justify-content-between mb-5">
                    <div class="w-100 d-flex flex-column align-items-start">
                        <p class="text-light mb-1">TYPE SELECT</p>
                        <select @change="apiCall(1)" v-model="selectType" class="form-select w-25" name="" id="">
                            <option value="">ALL</option>
                            <option v-for="elem in types" :value="elem.id">{{ elem.name }}</option>
                        </select>
                    </div>

                    <div v-if="store.btnPage" class="d-flex justify-content-end gap-4">
                        <button :disabled="currPage === 1" @click="apiCall(currPage - 1)"
                            class="btn btn-success">PREV</button>
                        <button class="btn" :class="{ 'btn-primary': page === currPage, 'btn-success': page !== currPage }"
                            @click="apiCall(page)" v-for="page in lastPage">{{ page }}</button>
                        <button :disabled="currPage === lastPage" @click="apiCall(currPage + 1)"
                            class="btn btn-success">NEXT</button>
                    </div>
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