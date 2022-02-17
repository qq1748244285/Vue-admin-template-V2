<template>
  <div>
    <Header/>
    <router-view></router-view>
    <Footer v-show="$route.meta.showFooter" />
  </div>
</template>

<script>
import Header from './components/Header/index.vue'
import Footer from './components/Footer/index.vue'
export default {
  name:'',
  data(){
    return{
      test:1
    }
  }, 
  components:{
    Header,
    Footer
  }
}
</script>


<style lang="less">
</style>