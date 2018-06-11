<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dot"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'

export default {
  props: {
    loop: {
      type: Boolean,
      default: true
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
    //浏览器刷新时间一般为17ms，设置20ms等待浏览器刷新后启动
    setTimeout (() => {
      this._setSliderWidth()
      this._initSlider()
    }, 20)
  },
  methods: {
    _setSliderWidth () {
      this.children = this.$refs.sliderGroup.children

      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth
      for(let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
      }
    },
    _initSlider () {

    }
  }
}
</script>

<style lang="stylus" scoped  rel="stylesheet/stylus">

</style>
