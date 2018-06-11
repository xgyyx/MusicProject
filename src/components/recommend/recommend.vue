<template>
  <div class="recommend">
    <div class="recommend-content">
      <slider>
        <div v-for="item of recommends" :key="item.id">
          <a href="item.linkUrl">
            <img :src="item.picUrl" />
          </a>
        </div>
      </slider>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Slider from 'base/slider/slider'
import {getRecommend} from 'api/recommend'
import {ERR_OK} from 'api/config'

export default {
  data () {
    return {
      recommends: []
    }
  },
  created () {
    this._getRecommend()
  },
  methods: {
    _getRecommend () {
      getRecommend().then((result) => {
        console.log(result)
        if (result.code === ERR_OK) {
          this.recommends = result.data.slider
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

  .recommend
    width 100%
</style>