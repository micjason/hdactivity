<template>
  <div class="permission">
    <div
      class="cu-modal"
      :class="{ show: permissionModal }"
      @touchmove.stop.prevent="moveHandle"
    >
      <div class="cu-dialog permission-wrapper">
        <div class="permission-title">微信授权</div>
        <div class="permission-content">
          <img
            class="permission-logo"
            mode="widthFix"
            src="@/static/assets/img/logo.png"
            alt=""
          />
          <span class="permission-name">海鼎小程序申请获得以下权限</span>
          <span class="permission-disc">
            <span class="iconfont icon-dian permission-disc-dian"></span>
            获得你的公开信息（昵称，头像，地区及性别）</span
          >
        </div>
        <div class="permission-btns">
          <button class="permission-btns-refuse" @click="handleRefuse">
            拒绝
          </button>
          <button class="permission-btns-allow" @click="handleAllow">
            允许
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: function () {
    return {};
  },
  props: {
    permissionModal: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    moveHandle() {},
    handleAllow() {
      if (uni.getUserProfile) {
        uni.getUserProfile({
          desc: "绘制分享海报",
          success: (res) => {
            this.$store.commit("setUserInfo", res.userInfo);
            this.$emit("handleAllow");
          },
          fail: () => {
            uni.showToast({
              title: "请授权使用",
              icon:'error',
              duration: 2000,
              success: () => {
                this.$emit("handleRefuse");
              },
            });
          },
        });
      } else {
        uni.showToast({
          title: "无法获取授权",
          icon:'error',
          duration: 2000,
          success: () => {
            this.$emit("handleRefuse");
          },
        });
      }
    },
    handleRefuse() {
      this.$emit("handleRefuse");
    },
  },
};
</script>
<style lang="scss" scoped>
.permission {
  .permission-wrapper {
    border-radius: 20rpx;
    .permission-title {
      font-size: 42rpx;
      font-weight: bold;
      line-height: 100rpx;
      margin-top: 30rpx;
      border-bottom: 1rpx solid $border-color-dark;
    }
    .permission-content {
      display: flex;
      flex-direction: column;
      padding: 0 40rpx;
      .permission-logo {
        width: 120rpx;
        height: 120rpx;
        border-radius: 50%;
        margin: 20rpx auto;
      }
      .permission-name {
        text-align: left;
        font-size: 36rpx;
        color: $font-color-dark;
        margin-bottom: 20rpx;
      }
      .permission-disc {
        display: flex;
        align-items: center;
        color: $font-color-light;
        font-size: 26rpx;
        background: #f3f3f3;
        padding: 8rpx 4rpx;
        .permission-disc-dian {
          font-size: 18rpx;
          margin-right: 8rpx;
        }
      }
    }
    .permission-btns {
      display: flex;
      border-top: 1rpx solid $border-color-dark;
      margin-top: 60rpx;
      button {
        padding: 0;
        flex: 1;
        border: none;
        border-radius: 0;
        height: 100rpx;
        line-height: 100rpx;
        &::after {
          border: none;
          border-radius: 0;
          border-top-left-radius: 0;
          border-top-right-radius: 0;
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        }
        &.permission-btns-refuse {
          border-right: 1rpx solid $border-color-dark;
        }
        &.permission-btns-allow {
          color: #629a38;
        }
      }
    }
  }
}
</style>
