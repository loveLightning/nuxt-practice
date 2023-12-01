<template>
  <div class="storage__cities-wrap">
    <div class="storage__cities-grid">
      <template v-if="favorites.length">
        <div v-for="favorite of favorites" :key="favorite.id" class="storage__cities-card" @click="$router.push(`cities/${favorite.name}`)">
          <p class="storage__cities-card-title">
            {{ favorite.name }}
          </p>
          <p class="storage__cities-card-temp">
            {{ Math.round(favorite.main.temp) }} &deg;
          </p>
          <img class="storage__cities-icon" :src="require(`~/assets/icons/${favorite.weather[0].main}.svg`)">
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { CityWeatherInfoTypes } from '~/types/weather'

export default defineComponent({
  props: {
    favorites: {
      type: Array as PropType<CityWeatherInfoTypes[]>,
      default: () => {}
    }
  }
})
</script>

<style>
  .storage__cities-wrap {
    margin: 55px auto 0;
    max-width: 872px;
  }

  .storage__cities-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 35px;
    row-gap: 30px;
  }

  .storage__cities-card {
    cursor: pointer;
    min-height: 190px;
    padding: 19px;
    border-radius: 6px;
    background-color: rgba(41,46,68, 0.5);
    text-align: center;
    position: relative;
  }

  .storage__cities-card-title {
    margin-bottom: 14px;
    line-height: 110.7%;
    font-size: 14px;
  }

  .storage__cities-card-temp {
    text-align: center;
    font-family: 'SF-Pro-Display-Medium';
    font-size: 40px;
    line-height: 110.7%;
  }

  .storage__cities-icon {
    max-width: 90px;
    height: auto;
  }

  @media screen and (max-width: 576px) {
    .storage__cities-wrap {
      margin-top: 40px;
      max-width: 872px;
    }

    .storage__cities-grid {
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      grid-gap: 20px;
      row-gap: 20px;
    }

    .storage__cities-card {
      padding: 16px;
    }
  }
</style>
