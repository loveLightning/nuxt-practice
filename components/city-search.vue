<template>
  <div class="city-search">
    <div class="container">
      <div v-click-outside="clickOnOutside" class="city-search__wrap-input">
        <input
          class="city-search__input"
          :value="valueCity"
          placeholder="Укажите город"
          type="text"
          @focus="focusOnInput"
          @input="onValueCityChange"
        >
        <div class="city-search__list">
          <div>
            <template v-if="isShowListOfCities && filteredCities?.data?.length && debouncedValue.length >= 3">
              <div v-for="city of filteredCities?.data" :key="city.id" class="city-search__highlight-wrap" @click="goToCardOfCity(city.name)">
                <!-- eslint-disable vue/no-v-html -->
                <p class="city-search__name" v-html="highlight(city.name) || city.name" />
              </div>
            </template>

            <p v-if="isLoadingCities " class="city-search__helper">
              Загрузка...
            </p>

            <p v-if="(!isLoadingCities && isShowListOfCities && !filteredCities?.data.length)" class="city-search__helper">
              Ничего не найдено
            </p>
          </div>
        </div>
      </div>

      <StorageCities v-if="favorites.length" :favorites="favorites" />

      <div v-if="!favorites.length && !isLoadingFavorites" class="city-search__wrap-arrow">
        <div class="city-search__inner-arrow">
          <div class="city-search__icon">
            <img src="~/assets/icons/Arrow.svg">
          </div>
          <p class="city-search__helper-text">
            Начните вводить город,
            например, <span class="city-search__city" @click="valueCity = 'Ижевск'"> Ижевск</span>
          </p>
        </div>
      </div>

      <div v-if="!favorites.length && !isLoadingFavorites" class="city-search__wrap-bookmarks">
        <p class="city-search__bookmarks">
          Используйте значок «закладки»,
          чтобы закрепить город на главной
        </p>
        <img src="~/assets/icons/Bookmark.svg">
      </div>

      <p v-if="!favorites.length && isLoadingFavorites">
        Загрузка...
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CitiesTypes } from '~/types/cities'
import { CityWeatherInfoTypes } from '~/types/weather'
import { debounce } from '~/utils'
import StorageCities from '~/components/storage-cities.vue'

export default defineComponent({
  components: {
    StorageCities
  },
  data: function () {
    return {
      valueCity: '',
      debouncedValue: '',
      filteredCities: null as CitiesTypes | null,
      favorites: [] as CityWeatherInfoTypes[],
      isLoadingFavorites: false,
      isLoadingCities: false,
      isShowListOfCities: false
    }
  },

  watch: {
    valueCity: debounce(function (newVal) {
      this.debouncedValue = newVal
      this.filteredCities = null

      if (this.debouncedValue.length >= 3) {
        this.isShowListOfCities = true

        this.getCities()
      } else {
        this.isShowListOfCities = false
      }
    }, 1000)
  },

  mounted () {
    const existingFavorites = JSON.parse(localStorage.getItem('favorites') || '[]') || []

    this.favorites = existingFavorites
  },

  methods: {
    async getCities () {
      try {
        this.isLoadingCities = true

        const data = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?&namePrefix=${this.debouncedValue}&languageCode=RU&types=CITY&namePrefixDefaultLangResults=True&sort=-population&limit=10`, {
          headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': '9764761c52mshc90d508614f9472p1c70f9jsn6af5ca78f7e1'
          }
        })

        const cities = await data.json()

        this.filteredCities = cities
      } finally {
        this.isLoadingCities = false
      }
    },
    onValueCityChange (event: Event) {
      const { value } = event.target as HTMLInputElement
      this.valueCity = value
    },
    focusOnInput () {
      if (this.debouncedValue.length >= 3) {
        this.isShowListOfCities = true
      }
    },
    clickOnOutside () {
      this.isShowListOfCities = false
    },
    goToCardOfCity (nameOfCity: string) {
      this.$router.push(`cities/${nameOfCity}`)
    },
    highlight (data: string) {
      if (this.debouncedValue) {
        const pattern = new RegExp(this.debouncedValue.trim(), 'i');

        const highlightedData = data.replace(
          pattern, `<span class="city-search__highlight">${this.debouncedValue.trim()}</span>`
        );

        return highlightedData.trim();
      }
    }
  }
})
</script>

<style>
  .city-search {
    min-height: calc(100vh - 63.06px);
    padding: 86px 0 90px;
    background-color: var(--dark-gray);
  }

  .city-search__wrap-input {
    position: relative;
    margin: auto;
    max-width: 510px;
  }

  .city-search__input {
    width: 100%;
    padding: 18px 20px;
    border: none;
    outline: none;
    background-color: var(--dark-blue);
    font-family: var(--SF-Pro-Display-Regular);
    line-height: normal;
    color: var(--white);
    font-size: 16px;
  }

  .city-search__input::placeholder {
    color: var(--light-gray);
  }

  .city-search__list {
    position: absolute;
    z-index: 1;
    width: 100%;
    overflow-y: auto;
    max-height: 300px;
    background-color: var(--dim-dark-blue);
  }

  .city-search__highlight-wrap {
    overflow-x: hidden;
    cursor: pointer;
    padding: 20px;
    text-overflow: ellipsis;
  }

  .city-search__highlight-wrap:hover {
    background-color: var(--dark-blue);
  }

  .city-search__helper {
    overflow-x: hidden;
    padding: 20px;
    text-overflow: ellipsis;
  }

  .city-search__wrap-arrow {
    display: flex;
    justify-content: center;
    margin-top: 44px;
  }

  .city-search__inner-arrow {
    position: relative;
    max-width: 170px;
  }

  .city-search__icon {
    position: absolute;
    left: -44px;
    top: -10px;
  }

  .city-search__helper-text {
    width: 100%;
    color: var(--light-gray);
    line-height: normal;
  }

  .city-search__city {
    cursor: pointer;
    color: var(--white);
    text-decoration: underline dotted;
  }

  .city-search__bookmarks {
    width: 100%;
    color: var(--light-gray);
  }

  .city-search__wrap-bookmarks {
    margin: 88px auto 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    max-width: 244px;
  }

  .city-search__name {
    color: var(--light-gray);
  }

  .city-search__name::first-letter {
    text-transform: uppercase;
  }

  .city-search__highlight {
    color: var(--white);
  }

  @media screen and (max-width: 576px) {
    .city-search {
      padding-top: 30px;
    }
  }

</style>
