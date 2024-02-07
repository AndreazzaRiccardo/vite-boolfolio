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
                    name: 'contact-us',
                    title: 'Contact Us'
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
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-5 py-1">
            <div class="container-fluid">
                <p class="navbar-brand m-0 fw-bolder">BoolFolio</p>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
                <div class="collapse navbar-collapse flex-grow-0 me-5" id="navbarSupportedContent">
                    <ul class="navbar-nav mb-2 mb-lg-0">
                        <li v-for="link in links" :key="link.name" class="nav-item">
                            <router-link class="nav-link" :to="{ name: link.name }">{{ link.title }}</router-link>
                        </li>
                        <li class="nav-item ms-5">
                            <a class="nav-link text-primary" href="http://127.0.0.1:8000/login">ADMIN</a>
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

<style lang="scss" scoped>

header {
    z-index: 2;

    nav {
        p {
            font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
            font-size: 2.5rem !important;
        }
    }

    .router-link-active {
        font-weight: bolder;
        border-bottom: 2px solid;
    }
}
</style>
