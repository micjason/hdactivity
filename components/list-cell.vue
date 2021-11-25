<template>
  <!-- hover-class 指定按下去的样式类。当 hover-class="none" 时，没有点击态效果 -->
  <!-- hover-stay-time 手指松开后点击态保留时间，单位毫秒 -->
  <view
    :class="['list-cell', listInfo.borderStyle]"
    @tap="eventClick"
    hover-class="cell-hover"
    :hover-stay-time="50"
  >
    <i v-if="listInfo.icon" class="t-icon cell-icon" :class="listInfo.icon" />
    <view class="cell-tit clamp">{{ listInfo.title }}</view>
    <view v-if="listInfo.tips" class="cell-tip">{{ listInfo.tips }}</view>
    <view class="cell-more iconfont icon-xiangyou"></view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    listInfo: {
      type: Object,
      default: function () {
        return {
          icon: "",
          title: "标题",
          url: "",
          tips: "",
          borderStyle: "",
        };
      },
    },
    callback: {
      type: Function,
    },
  },
  methods: {
    eventClick() {
      if (this.listInfo.type !== "btn") {
        this.$emit("eventClick", this.listInfo.url);
      } else {
        this.callback();
      }
    },
  },
};
</script>

<style lang="scss">
.list-cell {
  display: flex;
  align-items: center;
  padding: 20upx $page-row-spacing;
  height: 98upx;
  position: relative;
  background: #fff;

  &.cell-hover {
    background: #fafafa;
  }

  &.b-b:after {
    left: $page-row-spacing;
  }

  .cell-icon {
    align-self: center;
    width: 42upx;
    height: 42upx;
  }
  .cell-tit {
    flex: 1;
    font-size: $font-base;
    color: $font-color-dark;
    margin-right: 10upx;
    margin-left: 16upx;
  }
  .cell-tip {
    font-size: $font-sm + 2upx;
  }
  .cell-more {
    align-self: center;
    font-size: 30upx;
    color: $font-color-base;
    margin-left: $uni-spacing-row-sm;
  }
}
</style>
