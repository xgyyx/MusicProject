<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item, index) of dots" :key="index"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import {addClass} from 'common/js/operateDom'

export default {
  data () {
    return {
      children: '',
      slider: '',
      dots: [],
      currentPageIndex: 0
    }
  },
  props: {
    loop: {
      type: Boolean,
      default: false
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  mounted () {
    // 浏览器刷新时间一般为17ms，设置20ms等待浏览器刷新后启动
    setTimeout(() => {
      this._setSliderWidth()
      this._initDots()
      this._initSlider()
    }, 20)
  },
  methods: {
    _setSliderWidth () {
      this.children = this.$refs.sliderGroup.children

      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, 'slider-item')
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      if (this.loop) {
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initSlider () {
      console.log(this.options)
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: this.loop
        },
        snapThreshold: 0.3,
        snapSpeed: 400,
        click: true
      })
    },
    _initDots () {
      this.dots = new Array(this.children.length)
      console.log(this.dots)
    }
  }
}
</script>

<style lang="stylus" scoped  rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: .02rem
    position: relative
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float left
        box-sizing border-box
        overflow hidden
        text-align center
        padding: 0 .2rem
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      left: 0
      right: 0
      bottom: .24rem
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 .08rem
        width: .16rem
        height: .16rem
        border-radius: 50%
        background: $color-text-l
</style>
