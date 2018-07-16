<template>
  <div class="song-listview">
    <ul>
      <li v-for="song of songs" :key="song.id" class="song-listview-item">
        <div class="item-content">
          <div class="content-name">{{song.name}}</div>
          <div class="content-desc">{{getItemDesc(song)}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    songs: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    getItemDesc (item) {
      return `${item.singer}  ·  ${item.album}`
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .song-listview
    background: $color-main
    .song-listview-item
      display: flex
      align-items: center
      box-sizing: border-box
      height: 1.2rem
      color: #fff
      .item-content
        flex: 1
        line-height: .4rem
        overflow: hidden
        .content-name
          no-wrap()
        .content-desc
          no-wrap()
          font-size: .1rem
          color: $color-main-font
</style>
