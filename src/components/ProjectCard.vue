<script>
export default {
    data() {
        return {
            serverUrl: 'http://127.0.0.1:8000',
        }
    },
    props: {
        project: Object,
    },
    computed: {
        truncateText() {
            if (this.project.description && this.project.description.length > 100) {
                return this.project.description.substring(0, 100) + '...';
            }
            return this.project.description
        },
        borderClass() {
            if (this.project.type.name == 'FrontEnd') {
                return 'border-primary';
            } else if (this.project.type.name == 'BackEnd') {
                return 'border-warning';
            } else {
                return 'border-success';
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
        <img :src="project.cover_image ? `${serverUrl}/storage/${project.cover_image}` : getNoImg()" class="card-img-top"
            :alt="project.cover_image ? `Poster of ${project.name} project` : 'Image not avaiable'">
        <div class="card-body">
            <h5 class="card-title">{{ project.name }}</h5>
            <p class="card-text">{{ truncateText }}</p>
        </div>
        <hr>
        <ul class="list-group list-group-flush border-0">
            <li class="list-group-item"><span class="fw-bold">Type:</span> {{ project.type.name }}</li>
        </ul>
        <hr>
        <div class="card-body w-100">
            <a href="{{ project.link }}" class="card-link text-truncate d-block">{{ project.link }}</a>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>