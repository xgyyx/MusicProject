<template>
  <scroll class="list-view"
          :scrollData="data"
          :listenScroll=true
          @scroll="scroll"
          ref="listView">
    <ul>
      <li class="classify-list" v-for="group of data" :key="group.title" ref="listGroup">
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
      <ul @touchstart="handleTouchStart"
          @touchmove.stop.prevent="handleTouchMove"
          @touchend="handleTouchEnd"
          ref="alphabatGroup">
        <li v-for="(item, index) of shortcutList"
            class="list-Alphabat-item"
            :key="item"
            :data-Index="index">{{item}}</li>
      </ul>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import {getData} from 'common/js/operateDom'

const ANCHOR_HEIGH = 20
const TAB_COMPONENTS_HEIGH = 87

export default {
  data () {
    return {
      touchStatus: false,
      startY: 0,
      scrollY: -1
    }
  },
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
  },
  methods: {
    handleTouchStart (e) {
      this.touchStatus = true
      let anchorIndex = getData(e.target, 'index')
      this._scrollTo(anchorIndex)
    },
    handleTouchMove (e) {
      if (!this.touchStatus) {
        return
      }
      let touchY = e.touches[0].clientY
      let anchorIndex = Math.floor((touchY - this.startY) / ANCHOR_HEIGH)
      this._scrollTo(anchorIndex)
    },
    handleTouchEnd () {
      this.touchStatus = false
    },
    scroll (position) {
      this.scrollY = position.y
      console.log(this.scrollY)
    },
    _scrollTo (anchorIndex) {
      this.$refs.listView.scrollToElement(this.$refs.listGroup[anchorIndex], 0)
    }
  },
  updated () {
    this.startY = this.$refs.alphabatGroup.offsetTop + TAB_COMPONENTS_HEIGH
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
