<template>
  <div class="error">
    <div class="container">
      <div class="error__content">
        <h2 class="error__title">
          404 - ничего не найдено
        </h2>

        <div class="error__wrap-desc">
          <p class="error__desc">
            Извините, но запрашиваемая вами страница не существует
          </p>
        </div>

        <div>
          <nuxt-link class="error__link" to="/">
            На главную
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {

}
</script>

<style>
  .error {
    display: flex;
    align-items: center;
    height: 100vh;
    background-color: var(--dark-gray);
  }

  .error__content {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 30px;
    text-align: center;
  }

  .error__title {
    color: var(--light-gray);
  }

  .error__wrap-desc {
    max-width: 500px;
  }

  .error__desc {
    color: var(--light-gray);
  }

  .error__link {
    color: var(--white);
  }

  @media screen and (max-width: 576px) {
    .title {
      font-size: 36px;
    }
  }
</style>
