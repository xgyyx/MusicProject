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
      <div class="recommend-list">
        <div class="list-title">热门歌单</div>
        <ul class="playlist-table">
          <li v-for="item of playList" :key="item.dissid" class="playlist-item">
            <div class="playlist-icon">
              <img :src="item.imgurl" class="playlist-icon-img" />
              <div class="playlist-listennum">{{_changeNum(item.listennum)}}</div>
              <div class="playlist-creator">{{item.creator.name}}</div>
            </div>
            <div class="playlist-text">{{item.dissname}}</div>
          </li>
        </ul>
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
      recommends: [],
      playList: []
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
        if (result.code === ERR_OK) {
          this.playList = result.data.list
        }
      })
    },
    _changeNum (num) {
      let numString = num.toString()
      if (numString.length <= 5) {
        return num
      }
      return numString.substring(0, numString.length - 4) + '万'
    }
  },
  components: {
    Slider
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .slider-wrapper >>> img
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
    .recommend-list
      width: 100%
      .list-title
        height: 1rem
        line-height: 1rem
        padding-left: .2rem
        font-size: .32rem
      .playlist-table
        box-sizing: border-box
        padding: 0 .1rem
        .playlist-item
          float: left
          width: 33.3%
          box-sizing: border-box
          padding: 0 .1rem
          .playlist-icon
            position: relative
            color: #fff
            .playlist-icon-img
              width: 100%
              display: block
              background: #ccc
            .playlist-listennum
              position: absolute
              top: .1rem
              right: .1rem
              font-size: .24rem
            .playlist-creator
              position: absolute
              left: .1rem
              bottom: .1rem
              font-size: .22rem
              no-wrap()
          .playlist-text
            font-size: .26rem
            height: .6rem
            padding: .1rem .02rem
</style>