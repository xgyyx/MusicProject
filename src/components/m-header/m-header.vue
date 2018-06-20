<template>
  <div class="m-header">
    <div class="logo"><i class="iconfont icon-logo"></i></div>
    <div class="search"><input class="search-input" type="text" placeholder="搜索歌曲、歌单和歌手"></div>
    <div class="mine"><i class="iconfont icon-account"></i></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"
  @import "~common/stylus/variable"
  @import "~common/stylus/iconfont"

  .m-header
    height: .8rem
    display: flex
    justify-content: space-between
    color: $color-theme
    background: $color-main
    padding: 0.02rem 0
    .logo
      color: #fff
      line-height: .84rem
      font-size: 0
      .icon-logo
        font-size: .56rem
        margin: 0 .1rem 0 .2rem
        vertical-align: middle
        font-weight 500
    .search
      padding: .1rem
      flex: 1
      .search-input
        box-sizing: border-box
        width: 100%
        padding: 0 .3rem
        line-height: .6rem
        text-align: center
        vertical-align: center
        border-radius: .06rem
        background: $color-sub-main
        &:focus
          text-align: left
          background: #fff
        &::placeholder
          color: $color-main-font
    .mine
      color: #fff
      line-height: .8rem
      font-size: 0
      .icon-account
        font-size: .5rem
        margin: 0 .2rem 0 .1rem
        vertical-align: middle
</style>