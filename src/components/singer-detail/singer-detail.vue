<template>
  <transition name="slide">
    <music-list :musicListData="songs" :title="title" :backgroundImg="backgroundImg"></music-list>
  </transition>
</template>

<script>
import {mapGetters} from 'vuex'
import {getSingerDetail} from 'api/singer'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'
import MusicList from 'components/music-list/music-list'

export default {
  data () {
    return {
      songs: []
    }
  },
  components: {
    MusicList
  },
  computed: {
    title () {
      return this.getSinger.name
    },
    backgroundImg () {
      return this.getSinger.avatar
    },
    ...mapGetters([
      'getSinger'
    ])
  },
  created () {
    this._getSingerDetail()
  },
  methods: {
    _getSingerDetail () {
      if (!this.getSinger.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.getSinger.id).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.data.list)
          console.log(this.songs)
        }
      })
    },
    _normalizeSongs (list) {
      let ret = []
      list.forEach((item) => {
        let {musicData} = item
        if (musicData.songid && musicData.albumid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  }
}
</script>

<style lang="stylus" scoped>
  .slide-enter-active,.slide-leave-active
    transition: all .3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
