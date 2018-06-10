<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/recommend">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/singer">
      <span class="tab-link">歌手</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/rank">
      <span class="tab-link">排行</span>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .tab
    background: $color-main
    display: flex
    height: .8rem
    .tab-item
      flex: 0 0 33.3%
      text-align: center
      color: #fff
      line-height: .8rem
      font-size: 0
      .tab-link
        font-size: .28rem
        vertical-align: middle
        padding-bottom: .06rem
      &.router-link-active
        .tab-link
          border-bottom: 0.04rem solid #fff
          font-weight 500
</style>