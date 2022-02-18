<template>
  <div>
      我是搜索---{{$route.params.val}}
      我是搜索---{{$route.query.qqq}}
      我是props---{{val}}
  </div>
</template>

<script>
export default {
  mounted(){
    console.log(this.$route,'routete')
  },
  props:['val']
}
</script>

<style>

</style>