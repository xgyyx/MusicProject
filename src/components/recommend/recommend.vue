<template>
  <div class="recommend">
    <div class="background"></div>
    <div class="recommend-content">
      <div v-if="recommends.length" class="slider-wrapper">
        <slider>
          <div class="recommend-swiper-item" v-for="item of recommends" :key="item.id">
            <a href="item.linkUrl">
              <img :src="item.picUrl" />
            </a>
          </div>
        </slider>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Slider from 'base/slider/slider'
import {getRecommend, getPlayList} from 'api/recommend'
import {ERR_OK} from 'api/config'

export default {
  data () {
    return {
      recommends: []
    }
  },
  created () {
    this._getRecommend()
    this._getPlayList()
  },
  methods: {
    _getRecommend () {
      getRecommend().then((result) => {
        if (result.code === ERR_OK) {
          this.recommends = result.data.slider
        }
      })
    },
    _getPlayList () {
      getPlayList().then((result) => {
        console.log(result)
        if (result.code === ERR_OK) {
          console.log(result.data)
        }
      })
    }
  },
  components: {
    Slider
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .recommend >>> img
    border-radius: .06rem
  .recommend
    width 100%
    position: relative
    .background
      position: absolute
      top: 0
      left: 0
      right: 0
      height: 2.4rem
      background: $color-main
      .recommend-swiper-item
        border-radius: .1rem
</style>