<template>
  <div class="swiper-container" ref="banner">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(imageItem, index) of imageList"
        :key="imageItem.id"
      >
        <img
          :class="{ active: curr == index }"
          @click="checkImage(index)"
          :src="imageItem.imgUrl"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "ImageList",
  props: ["imageList"],
  watch: {
    imageList() {
      this.$nextTick(() => {
        new Swiper(this.$refs.banner, {
          // 如果需要前进后退按钮
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          // 如果需要滚动条
          scrollbar: {
            el: ".swiper-scrollbar",
          },
          slidesPerView: 3,
          slidesPerGroup: 1,
        });
      });
    },
  },
  data() {
    return {
      curr: 0,
    };
  },
  methods: {
    checkImage(i) {
      this.curr = i;
      //通知兄弟组件切换图片
      this.$bus.$emit('ChangeImage',i);
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 60px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }

  .active {
    border: 2px solid #f60 !important;
  }
}
</style>