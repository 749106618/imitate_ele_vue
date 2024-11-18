<script setup lang="ts">
import TheTop from './components/TheTop.vue'
import SearchView from '@/views/search/SearchView.vue'
import { useToggle } from '@/use/useToggle'

const [isSearchViewShown, toggleSearchView] = useToggle(false)
</script>

<template>
  <div class="home-page">
    <transition name="fade">
      <SearchView
        v-if="isSearchViewShown"
        @cancel="toggleSearchView"
      ></SearchView>
    </transition>
    <div v-show="!isSearchViewShown">
      <TheTop @searchClick="toggleSearchView" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.home-page {
  background: var(--op-gray-bg-color);
  padding-bottom: 70px;

  &__banner {
    img {
      width: 100%;
      padding-top: 10px;
      background: white;
    }
  }
  &__activity {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px;

    &__swipe {
      border-radius: 8px;
      width: 180px;
      height: 170px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
