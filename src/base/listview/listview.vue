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
    <div class="list-Alphabat">
      <ul>
        <li v-for="item of shortcutList" class="list-Alphabat-item" :key="item">{{item}}</li>
      </ul>
    </div>
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
  },
  computed: {
    shortcutList () {
      return this.data.map((group) => {
        return group.title.substr(0, 1)
      })
    }
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
          margin: 0 .6rem 0 .4rem
          border-bottom .02rem solid #eee
    .list-Alphabat
      position: absolute
      top: 0
      right: 0
      bottom: 0
      width: .6rem
      display: flex
      flex-direction: column
      justify-content: center
      .list-Alphabat-item
        text-align: center
        line-height: .4rem
        color: $color-main
</style>
