<template>
  <view class="item">
    <view class="item-wrapper" @click="jumpDetail(itemInfo.id)">
      <view class="item-left">
        <view class="item-title-box"
          ><text class="item-title">{{ itemInfo.title }}</text></view
        >
        <view class="item-tips-wrapper">
          <view
            class="item-tips-box"
            v-for="(item, index) in itemInfo.disc"
            :key="index"
            >{{ item }}</view
          >
        </view>
      </view>
      <view class="item-right"
        ><img :src="itemInfo.img"></img
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
          title: "标题",
          disc: "副标题",
          img: "",
          pdf: "",
        };
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    jumpDetail(id) {
      if (!id) return;
      uni.navigateTo({
        url: `/pages/case/detail?id=${id}`,
      });
    },
  },
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
      overflow: hidden;
      .item-title-box {
        height: 90rpx;
        .item-title {
          font-size: 30rpx;
          line-height: 42rpx;
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

      .item-tips-wrapper {
        display: flex;
        flex-wrap: wrap;
        margin-top: 10rpx;
        .item-tips-box {
          font-size: 22rpx;
          line-height: 36rpx;
          height: 36rpx;
          color:rgb(1,160,182);
          padding: 0 12rpx;
          border-radius: 8rpx;
          background:rgba(1,160,182,.08);
          margin-bottom: 5rpx;
          margin-right: 10rpx;
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    .item-right {
      flex-basis: 266rpx;
      height: 180rpx;
      flex-shrink: 0;
      background: #fff;
      border-radius: 10rpx;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
