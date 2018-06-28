<template>
  <scroll class="list-view" :scrollData="data">
    <ul>
      <li class="classify-list" v-for="group of data" :key="group.title">
        <div class="list-group-title">{{group.title}}</div>
        <ul class="singer-list-group">
          <li class="singer-list" v-for="item of group.item" :key="item.id">
            <img class="singer-avatar" v-lazy="item.avatar" />
            <div class="singer-name">{{item.name}}</div>
          </li>
        </ul>
      </li>
    </ul>
  </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'

export default {
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  components: {
    Scroll
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .list-view
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    .list-group-title
      height: .6rem
      line-height: .6rem
      padding-left: .4rem
      background: $color-main-font
      color: #fff
    .singer-list-group
      padding-top: .4rem
      .singer-list
        display: flex
        align-items: center
        padding: 0 0 .4rem .4rem
        .singer-avatar
          width: 1rem
          height: 1rem
          border-radius: 50%
        .singer-name
          width: 100%
          line-height: 1rem
          margin: 0 .4rem
          border-bottom .02rem solid #eee
</style>
