<script>
import { store } from '../store';

export default {
    data() {
        return {
            store
        }
    },
    props: {
        project: Object,
    },
    computed: {
        truncateText() {
            if (this.project.description && this.project.description.length > 50) {
                return this.project.description.substring(0, 50) + '...';
            }
            return this.project.description
        },
        borderClass() {
            if (this.project.type) {
                if (this.project.type.name == 'FrontEnd') {
                    return 'border-primary';
                } else if (this.project.type.name == 'BackEnd') {
                    return 'border-warning';
                } else {
                    return 'border-success';
                }
            }
        }
    },
    methods: {
        getNoImg() {
            return new URL(`../assets/img/no-image.webp`, import.meta.url).href;
        }
    }
}
</script>

<template>
    <div class="card h-100 border border-4" :class="borderClass">
        <div class="img-container">
            <img :src="project.cover_image ? `${store.serverUrl}/storage/${project.cover_image}` : getNoImg()"
                class="card-img-top"
                :alt="project.cover_image ? `Poster of ${project.name} project` : 'Image not avaiable'">
        </div>
        <div class="card-body">
            <h5 class="card-title">{{ project.name }}</h5>
            <p class="card-text">{{ truncateText }}</p>
        </div>
        <hr class="m-0">
        <div class="card-body details-btn">
            <router-link class="btn btn-primary"
                :to="{ name: 'single-project', params: { slug: project.slug } }">DETAILS</router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.details-btn {
    max-height: 70px;
}

.img-container {
    min-height: 200px;
    display: flex;
    align-items: center;
}
</style>