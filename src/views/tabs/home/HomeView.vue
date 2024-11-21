<script setup lang="ts">
import type { ICountdown, IHomeInfo } from '@/types'
import TheTop from './components/TheTop.vue'
import SearchView from '@/views/search/SearchView.vue'
import { useToggle } from '@/use/useToggle'
import { fetchHomePageData } from '@/api/home.ts'
import { useAsync } from '@/use/useAsync'
import OpLoadingView from '@/components/OpLoadingView.vue'
import TheTransformer from './components/TheTransformer.vue'
import ScrollBar from './components/ScrollBar.vue'
import CountDown from './components/CountDown.vue'
const [isSearchViewShown, toggleSearchView] = useToggle(false)

const { data, pending } = useAsync(fetchHomePageData, {
  banner: [],
  searchRecomments: [],
  transformer: [],
  scrollBarInfoList: [],
  countdown: {} as ICountdown,
  activities: [],
} as IHomeInfo)
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
      <TheTop
        :recomments="data.searchRecomments"
        @searchClick="toggleSearchView"
      />
      <OpLoadingView :loading="pending" type="skeleton">
        <div class="home-page__banner">
          <img v-for="v in data.banner" :key="v.imgUrl" :src="v.imgUrl" />
        </div>
        <TheTransformer :data="data.transformer" />
        <ScrollBar :data="data.scrollBarInfoList" />
        <div class="home-page__activity">
          <CountDown :data="data.countdown" />
        </div>
      </OpLoadingView>
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
  background: rgb(244, 244, 244);
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
