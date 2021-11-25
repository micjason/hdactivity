<template>
  <div class="share">
    <div class="share-btn" @click="doShare">
      <img
        class="share-img"
        mode="widthFix"
        src="@/static/assets/img/share.png"
        alt=""
      />
      <div class="share-name">分享</div>
    </div>
    <div
      class="cu-modal bottom-modal"
      :class="{ show: showShare }"
      @click="showShare = false"
      @touchmove.stop.prevent="moveHandle"
    >
      <div class="cu-dialog">
        <div class="bg-white share-wrapper">
          <div class="share-to">分享到：</div>
          <div class="share-type">
            <div class="share-type-box" @click="renderPost">
              <img
                class="s-t-b-img"
                mode="widthFix"
                src="@/static/assets/img/post.png"
                alt=""
              />
              <div class="s-t-b-name">生成海报</div>
            </div>
            <div class="share-type-box" @click="shareFriend">
              <img
                class="s-t-b-img"
                mode="widthFix"
                src="@/static/assets/img/wechat.png"
                alt=""
              />
              <div class="s-t-b-name">微信好友</div>
              <button open-type="share" class="share-hide">分享</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <posters
      v-if="showPost"
      @hidePoster="hidePoster"
      :canvasInfo="itemInfo"
    ></posters>
    <!-- <permission
      :permissionModal="showPermission"
      @handleAllow="handleAllow"
      @handleRefuse="handleRefuse"
    ></permission> -->
  </div>
</template>
<script>
import posters from "@/components/posters";
import permission from "@/components/permission";
export default {
  data: function () {
    return {
      showShare: false,
      // showPermission: false,
      showPost: false,
    };
  },
  props: {
    itemInfo: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  components: {
    posters,
    // permission,
  },
  methods: {
    // renderPost() {
    //   this.showShare = false;
    //   if (Object.keys(this.userInfo).length === 0) {
    //     this.showPermission = true;
    //   } else {
    //     this.showPost = true;
    //   }
    // },
    renderPost() {
      const that = this;
      that.showShare = false;
      if (Object.keys(that.userInfo).length !== 0) {
        that.showPost = true;
        return false;
      }

      //判断是否存在getUserProfile方法
      if (uni.getUserProfile) {
        uni.getUserProfile({
          desc: "绘制分享海报",
          success: (res) => {
            that.$store.commit("setUserInfo", res.userInfo);
            setTimeout(function () {
              that.showPost = true;
            }, 300);
          },
        });
      } else {
        console.log("功能暂未开放");
      }
    },
    hidePoster() {
      this.showPost = false;
    },
    doShare() {
      this.showShare = true;
    },
    shareFriend() {
      this.showShare = false;
    },
    // 禁止遮罩层后面的滚动事件
    moveHandle() {},
    // handleAllow() {
    //   this.showPermission = false;
    //   this.showShare = true;
    // },
    // handleRefuse() {
    //   this.showPermission = false;
    // },
  },
  onShareAppMessage(res) {
    if (res.from === "button") {
      // 来自页面内分享按钮
      console.log("来自页面内分享按钮", res.target);
    }
    return {
      title: this.itemInfo.title,
      path: `/pages/case/detail?id=${this.itemInfo.id}`,
      imageUrl: this.itemInfo.img,
      content: "我是自定义分享描述，请确定文案",
      success: function (res) {
        console.log("res", res);
        uni.showToast({
          title: "分享成功",
          icon: "success",
          duration: 2000,
          success: (res) => {},
        });
      },
    };
  },
};
</script>
<style lang="scss" scoped>
.share {
  .share-btn {
    position: fixed;
    width: 112rpx;
    height: 112rpx;
    border-radius: 56rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    bottom: 50%;
    margin-bottom: -56rpx;
    right: 40rpx;
    background: #1cbbb4;
    overflow: hidden;
    color: #fff;
    box-shadow: 0 0 10rpx 4rpx rgba(0, 0, 0, 0.2);
    z-index: 100;
    .share-img {
      width: 46rpx;
    }
    .share-name {
      margin-top: 6rpx;
      font-size: 13px;
    }
  }
  .share-wrapper {
    padding: 20rpx 160rpx 50rpx 160rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .share-to {
      color: $font-color-disabled;
    }
    .share-type {
      display: flex;
      justify-content: space-between;
      margin-top: 30rpx;
      .share-type-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        .s-t-b-img {
          width: 100rpx;
        }
        .s-t-b-name {
          margin-top: 10rpx;
          color: $font-color-light;
        }
        .share-hide {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
        }
      }
    }
  }
}
</style>
