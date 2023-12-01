<template>
  <div>
    <HeaderComponent :is-exists="false" />
    <WeatherInfo :weather-info="weatherInfo" />
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types';
import { CityWeatherInfoTypes } from '~/types/weather';
import WeatherInfo from '~/components/weather-info.vue';
import HeaderComponent from '~/components/header.vue';

export default {
  components: { WeatherInfo, HeaderComponent },

  async asyncData ({ params }: Context) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${params.city}&APPID=201a37e4b2245471209a5e303ac84b27&lang=ru&units=metric`)
    const weatherInfo: CityWeatherInfoTypes = await response.json()

    return { weatherInfo };
  },

  head () {
    return {
      title: this.$route.params.city,
      meta: [
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

<style>

</style>
