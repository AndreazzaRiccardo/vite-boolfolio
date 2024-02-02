import { reactive } from 'vue';

export const store = reactive({
    serverUrl: 'http://127.0.0.1:8000',
    projects: [],
    notFound: false,
    searchInput: '',
    btnPage: true
})