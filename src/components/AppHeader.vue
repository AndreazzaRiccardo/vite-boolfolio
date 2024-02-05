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
            store,
        }
    },
    methods: {
        searchWhitInput() {
            if (this.store.searchInput.length >= 3 && this.store.searchInput.trim() != "") {
                axios.get(`${store.serverUrl}/api/search/${this.store.searchInput}`)
                    .then((resp) => {
                        this.store.projects = resp.data.results;
                        this.store.btnPage = false;
                        this.store.notFound = false;
                        if (resp.data.results.length === 0) {
                            this.store.notFound = true;
                        }
                    })
            } else if (this.store.searchInput.trim() == "") {
                axios.get(`${this.store.serverUrl}/api/projects`)
                    .then((resp) => {
                        this.store.notFound = false;
                        this.store.btnPage = true;
                        this.store.projects = resp.data.results.data;
                    })
            }
        }
    }
}
</script>

<template>
    <header class="position-fixed w-100">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-5 py-0">
            <div class="container-fluid">
                <p class="navbar-brand m-0 fw-bolder">BoolFolio</p>
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
                <label hidden for="search-bar"></label>
                <input v-model="store.searchInput" @keyup="searchWhitInput" class="form-control me-2" type="text"
                    placeholder="Search" aria-label="Search" id="search-bar">
            </form>
        </nav>
    </header>
</template>

<style lang="scss" scoped></style>
