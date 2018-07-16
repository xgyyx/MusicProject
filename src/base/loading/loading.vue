<template>
  <div class="loading">
    <div class="loading-container">
      <img class="loading-img" src="./loading.gif" />
      <p class="loading-desc" ref="loadingTitle">{{title}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '正在加载'
    },
    titleColor: {
      type: String,
      default: '#fff'
    }
  },
  mounted () {
    this.$refs.loadingTitle.style.color = this.titleColor
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .loading
    width: 100%
    text-align: center
    height: 100%
    display: flex
    justify-content:center
    align-items:Center
    .loading-img
      width: .4rem
      height: .4rem
    .loading-desc
      line-height: .4rem
      color: $color-main
</style>
