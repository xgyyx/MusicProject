<template>
  <div class="loading">
    <img class="loading-img" src="./loading.gif" />
    <p class="loading-desc">{{title}}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '正在加载'
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .loading
    width: 100%
    text-align: center
    .loading-img
      width: .4rem
      height: .4rem
    .loading-desc
      line-height: .4rem
      color: $color-main
</style>
