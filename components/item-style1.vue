<template>
  <view class="item">
    <view class="item-wrapper">
      <view class="item-left">
        <view class="item-title-box"
          ><text class="item-title">{{ itemInfo.title }}</text></view
        >
        <view class="item-box">
          <text class="item-author">{{ itemInfo.author }}</text>
          <text class="item-time">{{ itemInfo.time }}</text>
        </view>
      </view>
      <view class="item-right"
        ><image mode="widthFix" :src="itemInfo.img"></image
      ></view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    itemInfo: {
      type: Object,
      default: function () {
        return {
          id: 1,
          title: "别再玩手机了，赶紧学前端，晚一年能少掉5根头发",
          author: "神秘前端",
          time: "2小时前",
          img: "http://fc-feed.cdn.bcebos.com/0/pic/9107b498a0cbea000842763091e833b6.jpg",
        };
      },
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.item {
  width: 750rpx;
  padding: 24rpx 30rpx 0 24rpx;
  background-color: #fff;
  .item-wrapper {
    display: flex;
    padding-bottom: 24rpx;
    border-bottom: 1rpx solid #e8e8e8;
    .item-left {
      flex: 1;
      padding-right: 16rpx;
      .item-title-box {
        height: 92rpx;
        .item-title {
          font-size: 32rpx;
          line-height: 46rpx;
          color: #303133;
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          word-wrap: break-word;
          white-space: normal !important;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }

      .item-box {
        margin-top: 20rpx;
        font-size: 26rpx;
        color: #aaa;
        .item-author {
        }
        .item-time {
          margin-left: 20rpx;
        }
      }
    }
    .item-right {
      flex-basis: 252rpx;
      height: 140rpx;
      flex-shrink: 0;
      background: #fff;
      border-radius: 10rpx;
      overflow: hidden;
    }
  }
}
</style>
