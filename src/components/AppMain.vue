<script>
import axios from 'axios';

export default {
    data() {
        return {
            serverUrl: 'http://127.0.0.1:8000',
            projects: []
        }
    },
    created() {
        axios.get(`${this.serverUrl}/api/projects`)
        .then((resp) => {
            console.log(resp);
        })
    }
}
</script>

<template>
    <div class="container py-4 text-center">
        <h1 class="text-light">PROJECTS LIST</h1>
    </div>
</template>

<style lang="scss" scoped></style>