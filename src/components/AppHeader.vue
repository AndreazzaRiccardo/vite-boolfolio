<script>
import axios from 'axios';
import { store } from '../store';

export default {
    data() {
        return {
            links: [
                {
                    name: 'home',
                    title: 'Home'
                },
                {
                    name: 'about',
                    title: 'About'
                }
            ],
            searchInput: '',
            store,
        }
    },
    methods: {
        searchWhitInput() {
            if (this.searchInput.length % 4 == 0 && this.searchInput.trim() != "") {
                axios.get(`${store.serverUrl}/api/search/${this.searchInput}`)
                    .then((resp) => {
                        this.store.projects = resp.data.results;
                        this.store.notFound = false;
                        if (resp.data.results.length === 0) {
                            this.store.notFound = true;
                        }
                    })
            } else if (this.searchInput.trim() == "") {
                axios.get(`${this.store.serverUrl}/api/projects`)
                    .then((resp) => {
                        this.store.notFound = false;
                        this.store.projects = resp.data.results.data;
                    })
            }
        }
    }
}
</script>

<template>
    <header>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-5">
            <div class="container-fluid">
                <p class="navbar-brand m-0">BoolFolio</p>
                <div class="collapse navbar-collapse flex-grow-0 me-5" id="navbarSupportedContent">
                    <ul class="navbar-nav mb-2 mb-lg-0">
                        <li v-for="link in links" :key="link.name" class="nav-item">
                            <router-link class="nav-link" :to="{ name: link.name }">{{ link.title }}</router-link>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="http://127.0.0.1:8000/login">ADMIN</a>
                        </li>
                    </ul>
                </div>
            </div>
            <form class="d-flex">
                <input v-model="searchInput" @keyup="searchWhitInput" class="form-control me-2" type="text"
                    placeholder="Search" aria-label="Search">
            </form>
        </nav>
    </header>
</template>

<style lang="scss" scoped></style>
