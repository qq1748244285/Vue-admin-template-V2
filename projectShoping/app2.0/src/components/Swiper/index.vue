<template>
  <!--banner轮播-->
  <div ref="mySwiper" class="swiper-container" id="mySwiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(item, index) in bannerList"
        :key="item.id"
      >
        <img :src="item.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";

export default {
  props: ["bannerList"],
  mounted() {
    this.$nextTick(() => {
      let mySwiper = new Swiper(this.$refs.mySwiper, {
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    });
  },
};
</script>

<style>
</style>