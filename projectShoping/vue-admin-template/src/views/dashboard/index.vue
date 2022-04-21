<!--
 * @Author: WenBin
 * @Date: 2022-04-02 13:01:54
 * @LastEditTime: 2022-04-21 14:18:40
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \vue-admin-template\src\views\dashboard\index.vue
 * @ascription 3xData
-->
<template>
  <div class="dashboard-container">
    <Card />
    <Sale />
    <Observe /> 
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Card from './Card'
import Sale from './Sale'
import Observe from './Observe'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
    ]),
  },
  components: { Card, Sale, Observe },
  mounted() {
    this.$store.dispatch('getCharts'); //派发actions获取首页图表数据 -mock
  },
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
} 
</style>
