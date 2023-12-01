<template>
  <div class="weather__info">
    <div v-if="weatherInfo" class="container">
      <div class="weather__info-wrap">
        <nuxt-link to="/" class="weather__info-wrap-back">
          <img src="~/assets/icons/Back.svg">
          <p class="weather__info-back">
            Назад
          </p>
        </nuxt-link>

        <div>
          <div class="weather__info-wrap-icon" @click="toggleFavorite">
            <template v-if="isFavorite">
              <img src="~/assets/icons/Active-bookmark.svg">
            </template>
            <template v-else>
              <img src="~/assets/icons/Inactive-bookmark.svg">
            </template>
          </div>
        </div>
      </div>

      <div class="weather__info-main-content">
        <div class="weather__info-wrap-title">
          <h1 class="weather__info-title">
            {{ weatherInfo.name }}
          </h1>
        </div>
        <div class="weather__info-wrap-subtitle">
          <p class="weather__info-subtitle">
            {{ weatherInfo.weather[0].description }}
          </p>
        </div>

        <div class="weather__info-wrap-temp">
          <p class="weather__info-text-temp">
            {{ Math.round(weatherInfo.main.temp) }} &deg;
          </p>

          <img class="weather__info-icon" :src="require(`~/assets/icons/${weatherInfo.weather[0].main}.svg`)">
        </div>

        <div class="weather__info-wrap-pressure">
          <img src="~/assets/icons/Barometer.svg">
          <p class="weather__info-text-pressure">
            {{ weatherInfo.main.pressure }} мм рт. ст.
          </p>
        </div>

        <div class="weather__info-sunset-wrap">
          <p class="weather__info-sunset-text">
            Закат в {{ formatTemp() }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { CityWeatherInfoTypes } from '~/types/weather';
import { getFormattedTime } from '~/utils'

export default defineComponent({
  props: {
    weatherInfo: {
      type: Object as PropType<CityWeatherInfoTypes>,
      default: () => ({})
    }
  },

  data: function () {
    return {
      isFavorite: false
    }
  },

  mounted () {
    this.checkIsFavoriteCity();
  },

  methods: {
    formatTemp () {
      return getFormattedTime(this.weatherInfo.sys.sunset)
    },

    toggleFavorite () {
      if (!this.weatherInfo) {
        return
      }
      const existingFavorites: CityWeatherInfoTypes[] = JSON.parse(localStorage.getItem('favorites') || '[]') || []

      const existingFavoriteIndex = existingFavorites.findIndex(favorite => favorite.id === this.weatherInfo?.id)

      if (existingFavoriteIndex !== -1) {
        existingFavorites.splice(existingFavoriteIndex, 1)
        this.isFavorite = false
      } else {
        existingFavorites.push(this.weatherInfo)
        this.isFavorite = true
      }

      localStorage.setItem('favorites', JSON.stringify(existingFavorites))
    },

    checkIsFavoriteCity () {
      if (this.weatherInfo) {
        const existingFavorites: CityWeatherInfoTypes[] = JSON.parse(localStorage.getItem('favorites') || '[]') || []

        const existingFavoriteIndex = existingFavorites.findIndex(favorite => favorite.id === this.weatherInfo.id)

        if (existingFavoriteIndex !== -1) {
          this.isFavorite = true
        }
      }
    }
  }
})
</script>
<style>
  .weather__info {
    min-height: calc(100vh - 63.06px);
    background: linear-gradient(180deg, var(--gray) -80.36%, var(--dark-gray) 80.36%);
  }

  .weather__info-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 26px;
    margin-bottom: 28px;
  }

  .weather__info-wrap-back {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .weather__info-back {
    color: var(--light-gray);
    line-height: 110.7%;
  }

  .weather__info-wrap-icon {
    cursor: pointer;
  }

  .weather__info-main-content {
    padding-bottom: 50px;
    text-align: center;
  }

  .weather__info-title {
    font-family: var(--SF-Pro-Display-Medium);
    font-size: 56px;
    line-height: 110.7%;
    text-align: center;
    user-select: none;
    color: var(--white);
  }

  .weather__info-wrap-subtitle {
    margin: 13px 0 20px;
  }

  .weather__info-subtitle:first-letter {
    text-transform: uppercase;
  }

  .weather__info-wrap-temp {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
  }

  .weather__info-text-temp {
    font-family: var(--SF-Pro-Display-Semibold);
    font-size: 129px;
    line-height: 110.7%;
    background: linear-gradient(180deg, var(--white) 11.65%, rgba(255, 255, 255, 0.00) 139.47%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .weather__info-icon {
    max-width: 180px;
    height: auto;
  }

  .weather__info-wrap-pressure {
    margin: 86px 0 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }

  .weather__info-sunset-text {
    color: var(--light-gray);
  }

  @media screen and (max-width: 576px) {
    .weather__info {
      min-height: calc(100vh);
      background: linear-gradient(180deg, var(--gray) 0%, var(--dark-gray) 49.93%);
    }

    .weather__info-title {
      font-size: 24px;
    }

    .weather__info-back {
      display: none;
    }

    .weather__info-subtitle {
      font-size: 14px;
    }

    .weather__info-wrap-temp {
      flex-direction: column;
    }

    .weather__info-text-pressure {
      font-size: 14px;
    }

    .weather__info-sunset-text {
      font-size: 14px;
    }

    .weather__info-wrap {
      padding-top: 20px;
      margin-bottom: 48px;
    }

    .weather__info-wrap-subtitle {
      margin: 13px 0 20px;
    }

    .weather__info-wrap-pressure {
      margin-top: 0;
    }
  }
</style>
