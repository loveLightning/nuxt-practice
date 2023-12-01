<template>
  <header class="header">
    <div :class="{ 'header__content': true, 'header__content_isExists ': !isExists }">
      <div class="header__logo-wrap" @click="backHome">
        <img class="header__logo" src="~/assets/icons/Logo.svg">

        <p class="header__logo-text">
          WeatherCheck
        </p>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HeaderComponent',
  props: {
    isExists: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    backHome () {
      this.$router.push('/')
    }
  }
})
</script>

<style>
  .header__content {
    background: var(--dark-blue);
    padding: 20px 23px;
  }

  .header__logo-text {
    font-family: var(--SF-Pro-Display-Bold);
  }

  .header__logo-wrap {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 12px;
    width: fit-content;
  }

  .header__logo {
    max-width: 30px;
    height: auto;
  }

  @media screen and (max-width: 576px) {
    .header__content {
      padding: 17px 20px;
      background-color: var(--dark-gray);
    }

    .header__content_isExists {
      display: none;
    }
  }

</style>
