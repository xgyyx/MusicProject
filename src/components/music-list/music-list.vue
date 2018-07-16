<template>
  <div class="music-list">
    <div class="back" @click="back"><i class="back-inside iconfont icon-back"></i></div>
    <div class="title" v-html="title"></div>
    <div class="bg-img" :style="bgStyle" ref="bgImg">
      <div class="filter" ref="bgImgFilter"></div>
      <div class="play-wrapper" v-show="this.musicListData.length" ref="playBtnPart">
        <div class="play-button">
          <i class="icon iconfont icon-icon-2"></i>
          <span class="text">随机播放</span>
        </div>
      </div>
    </div>
    <scroll :scrollData="this.musicListData"
            :listen-scroll="listenScroll"
            :probe-type="probeType"
            @scroll="listenToScroll"
            class="scroll"
            ref="scroll">
      <div class="scroll-wrapper">
        <song-list-view :songs="this.musicListData"></song-list-view>
      </div>
      <loading v-show="!this.musicListData.length"></loading>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import SongListView from 'base/song-listview/song-listview'
import {prefixStyleforJS} from 'common/js/operateDom'
import Loading from 'base/loading/loading'

const RESERVED_HEIGHT = 40
const TRANSFORM = prefixStyleforJS('transform')
const BACKDROP = prefixStyleforJS('backdrop=filter')

export default {
  props: {
    backgroundImg: {
      type: String,
      default: ''
    },
    musicListData: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    }
  },
  components: {
    Scroll,
    SongListView,
    Loading
  },
  data () {
    return {
      scrollY: -1
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    _setScrollListTop () {
      this.$refs.scroll.$el.style.top = `${this.$refs.bgImg.clientHeight}px`
    },
    listenToScroll (position) {
      this.scrollY = position.y
    }
  },
  computed: {
    bgStyle () {
      return `background-image:url(${this.backgroundImg})`
    }
  },
  watch: {
    scrollY (newY) {
      console.log(newY)
      let zIndex = 0
      let scale = 1
      let blur = 0
      let scrollPercent = Math.abs(newY / this.bgImgHeight)
      // 下拉列表效果
      if (newY > 0) {
        scale = 1 + scrollPercent
      } else {
        // 高斯模糊效果
        blur = Math.min(20 * scrollPercent, 20)
      }
      this.$refs.bgImgFilter.style[BACKDROP] = `blur(${blur}px)`
      this.$refs.bgImg.style[TRANSFORM] = `scale(${scale})`
      // 上拉列表效果
      if (newY < this.minTranslateY) {
        zIndex = 5
        this.$refs.bgImg.style.paddingTop = 0
        this.$refs.bgImg.style.height = `${RESERVED_HEIGHT}px`
        this.$refs.playBtnPart.style.display = 'none'
      } else {
        this.$refs.bgImg.style.paddingTop = '70%'
        this.$refs.bgImg.style.height = 0
        this.$refs.playBtnPart.style.display = ''
      }
      this.$refs.bgImg.style.zIndex = zIndex
    }
  },
  created () {
    this.probeType = 3
    this.listenScroll = true
  },
  mounted () {
    this.bgImgHeight = this.$refs.bgImg.clientHeight
    this.minTranslateY = -this.bgImgHeight + RESERVED_HEIGHT
    this._setScrollListTop()
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/iconfont"
  @import "~common/stylus/mixin"
  @import "~common/stylus/variable"

  .music-list
    position: fixed
    z-index: 5
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: $color-main
    .back
      position: absolute
      z-index: 7
      color: #fff
      line-height: .8rem
      font-size: 0
      padding-left: .1rem
      .back-inside
        font-size: .5rem
        vertical-align: middle
    .title
      text-align: center
      position: absolute
      z-index: 6
      top 0rem
      left: 0
      right: 0
      color: #fff
      font-size: .36rem
      line-height: .8rem
      no-wrap()
    .bg-img
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      background-size: cover
      transform-origin: top
      .play-wrapper
        position: absolute
        bottom: .4rem
        width: 100%
        color: #fff
        .play-button
          text-align: center
          box-sizing: border-box
          padding: .1rem 0
          background: $color-sub-main
          border-radius: .1rem
          width: 2.2rem
          margin: 0 auto
          font-size: 0
          .icon
            vertical-align: middle
            margin-right: .1rem
          .text
            display: inline-block
            font-size: .2rem
            height: 100%
            vertical-align: middle
      .filter
        position: absolute
        top: 0
        left: 0
        right: 0
        bottom: 0
        background: rgba(7, 17, 27, 0.4)
    .scroll
      position: absolute
      top: 0
      bottom: 0
      width: 100%
      .scroll-wrapper
        padding: .2rem .6rem
        background: $color-main
</style>
