<template>
  <div>
    <!-- 全局组件-三级联动 -->
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor :List="item" v-for="(item,index) in floorList" :key="item.id" />
    <Brand />
  </div>
</template>

<script>
import { mapState } from "vuex";

import ListContainer from "@/pages/Home/ListContainer";
import Recommend from "@/pages/Home/Recommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";
export default {
  name: "Home",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    this.$store.dispatch("actions_GetFloorList");
  },
  computed: {
    ...mapState({
      floorList: (state) => state.Home.floorList,
    }),
  },
  data() {
    return {};
  },
};
</script>

<style scoped lang="less">
</style>