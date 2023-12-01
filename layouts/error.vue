<template>
  <Error />
</template>

<script lang="ts">
import Error from '~/components/error.vue';

export default {
  components: { Error },
  layout: 'blog',
  // eslint-disable-next-line vue/require-prop-types
  props: ['error'],
  head () {
    return {
      title: 'Ничего не найдено',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'My custom description'
        }
      ]
    }
  }
}
</script>
