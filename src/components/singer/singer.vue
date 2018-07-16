<template>
  <div class="singer-main">
    <list-view @select="selectSinger" :data="singers"></list-view>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import {getSingerList} from 'api/singer'
import {ERR_OK} from 'api/config'
import Singer from 'common/js/singer'
import ListView from 'base/listview/listview'
import {mapMutations} from 'vuex'

const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10

export default {
  data () {
    return {
      singers: []
    }
  },
  components: {
    ListView
  },
  created () {
    this._getSingerList()
  },
  methods: {
    selectSinger (singerContent) {
      this.$router.push({
        path: `/singer/${singerContent.id}`
      })
      this.setSinger(singerContent)
    },
    _getSingerList () {
      getSingerList().then((result) => {
        if (result.code === ERR_OK) {
          this.singers = this._normalizeSinger(result.data.list)
        }
      })
    },
    _normalizeSinger (list) {
      let map = {
        hot: {
          title: HOT_NAME,
          item: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.item.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        }
        let key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            item: []
          }
        }
        map[key].item.push(new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        }))
      })
      // 数组排序
      let hot = []
      let alphabet = []
      let other = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          alphabet.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        } else {
          val.title = '#'
          other.push(val)
        }
      }
      alphabet.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })

      return hot.concat(alphabet).concat(other)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .singer-main
    position: fixed
    top: 1.74rem
    width: 100%
    bottom: 0
</style>