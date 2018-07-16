<template>
  <scroll class="list-view"
          :scrollData="data"
          :listenScroll=true
          :probeType=3
          @scroll="scrollPosition"
          ref="listView">
    <ul>
      <li class="classify-list" v-for="group of data" :key="group.title" ref="listGroup">
        <div class="list-group-title">{{group.title}}</div>
        <ul class="singer-list-group">
          <li class="singer-list" v-for="item of group.item" :key="item.id" @click="jumpToSingerDetail(item)">
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
            :data-Index="index"
            :class="{'current':currentIndex===index}">{{item}}</li>
      </ul>
    </div>
    <div class="fixed-list" v-show="fixedTitle" ref="fixed">
      <div class="fixed-list-title">{{fixedTitle}}</div>
    </div>
    <div v-show="!data.length" class="loading-container">
      <loading></loading>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import {getData} from 'common/js/operateDom'
import Loading from 'base/loading/loading'

const ANCHOR_HEIGH = 20
const TAB_COMPONENTS_HEIGH = 87
const TITLE_HEIGH = 30

export default {
  data () {
    return {
      touchStatus: false,
      startY: 0,
      scrollY: -1,
      currentIndex: 0,
      listHeight: [],
      timer: null,
      diff: -1
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
    Scroll,
    Loading
  },
  computed: {
    shortcutList () {
      return this.data.map((group) => {
        return group.title.substr(0, 1)
      })
    },
    fixedTitle () {
      if (this.scrollY > 0 || !this.data || !this.currentIndex) {
        return ''
      }
      return this.data[this.currentIndex].title ? this.data[this.currentIndex].title : ''
    }
  },
  methods: {
    jumpToSingerDetail (content) {
      this.$emit('select', content)
    },
    handleTouchStart (e) {
      this.touchStatus = true
      let anchorIndex = getData(e.target, 'index')
      this._scrollTo(anchorIndex)
    },
    handleTouchMove (e) {
      if (!this.touchStatus) {
        return
      }
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        let touchY = e.touches[0].clientY
        let anchorIndex = Math.floor((touchY - this.startY) / ANCHOR_HEIGH)
        this._scrollTo(anchorIndex)
      }, 16)
    },
    handleTouchEnd () {
      this.touchStatus = false
    },
    scrollPosition (position) {
      this.scrollY = position.y
    },
    _scrollTo (anchorIndex) {
      if (anchorIndex < 0) {
        anchorIndex = 0
      } else if (anchorIndex > this.listHeight.length - 2) {
        anchorIndex = this.listHeight.length - 2
      }
      console.log(anchorIndex)
      this.scrollY = -(this.listHeight[anchorIndex])
      this.$refs.listView.scrollToElement(this.$refs.listGroup[anchorIndex], 0)
    },
    _calculateHeight () {
      this.listHeight = []
      let list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }
  },
  watch: {
    data () {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    scrollY (newY) {
      const allList = this.listHeight
      // 滚动到顶部并拉出顶部
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      // 中间部分滚动
      for (let i = 0; i < allList.length - 1; i++) {
        if (-newY >= allList[i] && -newY < allList[i + 1]) {
          this.currentIndex = i
          this.diff = allList[i + 1] + newY
          return
        }
      }
      // 滚动到底部并拉出底部
      this.currentIndex = allList.length - 2
    },
    diff (newDiff) {
      let fixedTopDistance = (newDiff > 0 && newDiff < TITLE_HEIGH) ? (newDiff - TITLE_HEIGH) : 0
      if (this.fixedTopDistance === fixedTopDistance) {
        return
      }
      this.fixedTopDistance = fixedTopDistance
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTopDistance}px,0)`
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
        &.current
          color: $color-main-font
    .fixed-list
      position: absolute
      top: 0
      left: 0
      right: 0
      .fixed-list-title
        height: .6rem
        line-height: .6rem
        padding-left: .4rem
        background: $color-main-font
        color: #fff
    .loading-container
      position: absolute
      top: 50%
      width: 100%
      transform: translateY(-50%)
</style>
