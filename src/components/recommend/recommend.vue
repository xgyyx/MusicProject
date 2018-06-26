<template>
  <div class="recommend">
    <scroll :scrollData="this.playList" class="main-scroll" ref="scrollMain">
      <div class="recommend-content" ref="scroll">
        <div class="background"></div>
        <div v-if="recommends.length" class="slider-wrapper">
          <slider>
            <div class="recommend-swiper-item" v-for="item of recommends" :key="item.id">
              <a href="item.linkUrl">
                <img :src="item.picUrl" @load="loadImage" />
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
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import Slider from 'base/slider/slider'
import {getRecommend, getPlayList} from 'api/recommend'
import {ERR_OK} from 'api/config'
import Scroll from 'base/scroll/scroll'

export default {
  data () {
    return {
      recommends: [],
      playList: [],
      checkLoaded: false
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
    },
    loadImage () {
      if (!this.checkLoaded) {
        this.$refs.scrollMain.refresh()
        this.checkLoaded = true
      }
    }
  },
  components: {
    Slider,
    Scroll
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
    position: fixed
    top: 1.74rem
    bottom 0
    .main-scroll
      overflow: hidden
      height: 100%
      .recommend-content
        overflow: hidden
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
            display: flex
            flex-wrap: wrap
            box-sizing: border-box
            padding: 0 .1rem
            overflow: hidden
            .playlist-item
              flex: 0 0 33.333%
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