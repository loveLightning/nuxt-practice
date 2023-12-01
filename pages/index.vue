<template>
  <div>
    <HeaderComponent />
    <City-search />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HeaderComponent from '@/components/header.vue'
import CitySearch from '@/components/city-search.vue'

export default Vue.extend({
  name: 'IndexPage',
  components: { CitySearch, HeaderComponent }
})
</script>
