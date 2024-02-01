<script>
import AppMain from './components/AppMain.vue'

export default {
  data() {
    return {

    }
  },
  components: {
    AppMain
  }
}
</script>

<template>
  <div class="container py-4">
    <AppMain />
  </div>
  
</template>

<style lang="scss" scoped>
@use './styles/general.scss' as *;
</style>
