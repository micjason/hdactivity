<template>
  <view class="user">
    <!--头部-->
    <view class="user-section" :class="'bg-' + themeColor.name">
      <image class="bg" :src="userBg"></image>
      <!--用户信息-->
      <view class="user-info-box">
        <view class="portrait-box">
          <image
            class="portrait"
            :src="userInfo.avatarUrl || headImg"
            @click="getUserInfo"
          ></image>
          <text class="username">
            {{ userInfo.nickName || "游客" }}
          </text>
        </view>
      </view>
      <!--vip信息-->
      <view class="vip-card-box">
        <view class="b-btn">
          {{ "尊贵会员" }}
        </view>
        <view class="tit">
          <i class="iconfont iconzuanshi" />
          {{ "海鼎" }}
        </view>
        <text class="e-m">欢迎使用海鼎品牌中心小程序</text>
      </view>
    </view>
    <!-- 个人中心 内容区-->
    <view
      class="cover-container"
      :style="[
        {
          transform: coverTransform,
          transition: coverTransition,
        },
      ]"
      @touchstart="coverTouchstart"
      @touchmove="coverTouchmove"
      @touchend="coverTouchend"
    >
      <image class="arc" :src="arc"></image>
      <!--个人中心-->
      <!-- <view class="promotion-center">
        <list-cell :listInfo="syslist"></list-cell>
        <view class="management-section">
          <view
            class="management-item"
            v-for="(item, index) in mycenterList"
            :key="index"
            hover-class="common-hover"
            :hover-stay-time="50"
            @click="jumpUrl(item.url)"
          >
            <i
              class="iconfont"
              :class="[item.icon, 'text-' + themeColor.name]"
            />
            <text>{{ item.title }}</text>
          </view>
        </view>
      </view> -->
      <!-- 个人资料 -->
      <view class="set-list">
        <view v-for="(item, index) in setList" :key="index"
          ><list-cell :listInfo="item" @eventClick="callback(item)"></list-cell
        ></view>
      </view>

      <official-account></official-account>

      <view class="cu-list menu sm-border card-menu">
        <view class="cu-item">
          <view class="content flex align-center">
            <text
              class="cuIcon-colorlens"
              :class="'text-' + themeColor.name"
            ></text>
            <view
              class="padding solid radius shadow-blur"
              :class="'bg-' + themeColor.name"
            ></view>
            <view class="title"
              >主题色：<text :class="'text-' + themeColor.name">{{
                themeColor.title
              }}</text></view
            >
          </view>
          <view class="action">
            <button
              class="cu-btn round shadow"
              @click="showColorModal"
              :class="'bg-' + themeColor.name"
            >
              <text class="cuIcon-colorlens"></text> 选择主题
            </button>
          </view>
        </view>
      </view>

      <!-- 选择颜色模态框 -->
      <view class="cu-modal" :class="{ show: colorModal }">
        <view class="cu-dialog">
          <view class="cu-bar justify-end solid-bottom">
            <view class="content">选择颜色</view>
            <view class="action" @click="hideColorModel">
              <text class="cuIcon-close text-red"></text>
            </view>
          </view>
          <view class="grid col-5 padding">
            <view
              class="padding-xs"
              v-for="(item, index) in themeList"
              :key="index"
              @tap="SetColor(item)"
              :data-color="item.name"
            >
              <view class="padding-tb radius" :class="'bg-' + item.name">
                {{ item.title }}
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import listCell from "@/components/list-cell";
let startY = 0,
  moveY = 0,
  pageAtTop = true;
export default {
  components: {
    listCell,
  },
  data() {
    return {
      colorModal: false,
      mycenterList: this.$mycentConfig.mycenterList,
      themeList: this.$themeConfig.themeList,
      setList: this.$setListConfig.setList,
      headImg: this.$assetsConfig.headImg,
      logoImg: this.$assetsConfig.logoImg,
      userBg: this.$assetsConfig.userBg,
      vipCardBg: this.$assetsConfig.vipCardBg,
      arc: this.$assetsConfig.arc,
      coverTransform: "translateY(0px)",
      coverTransition: "0s",
      moving: false,
      syslist: {
        title: "管理员功能",
        borderStyle: "b-b",
      },
    };
  },
  async onShow() {
    // 初始化数据
    await this.initData();
  },
  onLoad() {},
  methods: {
    // 数据初始化
    async initData() {
      // 动态设置 tabBar 的整体样式
      uni.setTabBarStyle({
        selectedColor: this.themeColor.color,
        borderStyle: "white",
      });
      // 设置页面导航条颜色。如果需要进入页面就设置颜色，请延迟执行，防止被框架内设置颜色逻辑覆盖
      uni.setNavigationBarColor({
        frontColor: "#ffffff",
        backgroundColor: this.themeColor.color,
        animation: {
          duration: 400,
          timingFunc: "easeIn",
        },
      });
      this.themeColor.tabList &&
        this.themeColor.tabList.forEach((selectedIconPath, index) => {
          // 动态设置 tabBar 某一项的内容
          uni.setTabBarItem({
            index,
            selectedIconPath,
          });
        });
    },
    showColorModal() {
      this.colorModal = true;
    },
    hideColorModel() {
      this.colorModal = false;
    },
    SetColor(item) {
      this.colorModal = false;
      this.themeColor = item;
      this.$store.commit("setThemeColor", item);
      uni.setNavigationBarColor({
        frontColor: "#ffffff",
        backgroundColor: this.themeColor.color,
        animation: {
          duration: 400,
          timingFunc: "easeIn",
        },
      });
      uni.setTabBarStyle({
        selectedColor: this.themeColor.color,
        borderStyle: "white",
      });
      this.themeColor.tabList &&
        this.themeColor.tabList.forEach((selectedIconPath, index) => {
          uni.setTabBarItem({
            index,
            selectedIconPath,
          });
        });
    },
    coverTouchstart(e) {
      if (pageAtTop === false) {
        return;
      }
      this.coverTransition = "transform .1s linear";
      startY = e.touches[0].clientY;
    },
    coverTouchmove(e) {
      moveY = e.touches[0].clientY;
      let moveDistance = moveY - startY;
      if (moveDistance < 0) {
        this.moving = false;
        return;
      }
      this.moving = true;
      if (moveDistance >= 80 && moveDistance < 100) {
        moveDistance = 80;
      }
      if (moveDistance > 0 && moveDistance <= 80) {
        this.coverTransform = `translateY(${moveDistance}px)`;
      }
    },
    coverTouchend() {
      if (this.moving === false) {
        return;
      }
      this.moving = false;
      this.coverTransition = "transform 0.3s cubic-bezier(.21,1.93,.53,.64)";
      this.coverTransform = "translateY(0px)";
    },
    getUserInfo() {
      const that = this;
      if (Object.keys(that.userInfo).length !== 0) return;

      //判断是否存在getUserProfile方法
      if (uni.getUserProfile) {
        uni.getUserProfile({
          desc: "绘制分享海报",
          success: (res) => {
            that.$store.commit("setUserInfo", res.userInfo);
          },
        });
      } else {
        console.log("功能暂未开放");
      }
    },
    callback(item) {
      if (item.title == "通知消息") {
        uni.showToast({
          title: "暂未收到通知消息",
          icon: "none",
        });
      } else if (item.title == "授权开关") {
        this.getSetting();
      } else if (item.title == "我参加的会议") {
        uni.navigateTo({
          url: item.url,
        });
      }
    },
    jumpUrl(url) {
      uni.showToast({
        title: "暂未收到通知消息",
        icon: "none",
      });
    },
    getSetting() {
      const that = this;
      uni.openSetting({
        success(res) {
          if (res.authSetting["scope.userInfo"] === false) {
            that.$store.commit("setUserInfo", {});
          }
        },
      });
    },
  },
  onShareAppMessage(res) {
    if (res.from === "button") {
      // 来自页面内分享按钮
      console.log("来自页面内分享按钮", res.target);
    }
    return {
      title: "海鼎品牌中心小程序",
      path: "/pages/case/index",
      imageUrl: this.logoImg,
      content: "我是自定义分享描述，请确定文案",
      success: function (res) {
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
<style lang="scss">
page {
  background-color: $page-color-base;
}

.user {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .user-section {
    height: 520upx;
    padding: 100upx 30upx 0;
    position: relative;

    .bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100vw;
      height: 60vw;
      opacity: 0.84;
    }

    .user-info-box {
      height: 180upx;
      display: flex;
      align-items: center;
      position: relative;
      z-index: 1;
      justify-content: space-between;

      .portrait-box {
        display: flex;
        align-items: center;

        .portrait {
          width: 130upx;
          height: 130upx;
          border: 5upx solid #fff;
          border-radius: 50%;
        }

        .username {
          font-size: $font-lg + 6upx;
          color: $color-white;
          margin-left: 20upx;
        }
      }
    }

    .vip-card-box {
      display: flex;
      flex-direction: column;
      color: #f7d680;
      height: 240upx;
      background: url("/static/assets/img/vip-card.png");
      background-size: 100% 100%;
      border-radius: 16upx 16upx 0 0;
      overflow: hidden;
      position: relative;
      padding: 20upx 24upx;

      .b-btn {
        position: absolute;
        right: 24upx;
        top: 24upx;
        width: 160upx;
        height: 40upx;
        text-align: center;
        line-height: 40upx;
        font-size: 22upx;
        color: #36343c;
        border-radius: 20px;
        background: linear-gradient(to left, #f9e6af, #ffd465);
        z-index: 1;
      }

      .tit {
        font-size: $font-base + 2upx;
        color: #f7d680;
        margin-bottom: 28upx;

        .iconfont {
          color: #f6e5a3;
          display: inline-block;
          margin-right: 16upx;
        }
      }
    }
  }

  .cover-container {
    flex: 1;
    margin-top: -150upx;
    padding: 0 30upx 20upx;
    position: relative;
    background-color: $page-color-base;

    .arc {
      position: absolute;
      left: 0;
      top: -34upx;
      width: 100%;
      height: 36upx;
    }

    .promotion-center {
      background: #fff;
      margin-bottom: 20upx;
    }
  }
  .promotion-center {
    background: #fff;
    margin-bottom: 20upx;
  }

  .management-section {
    @extend %section;
    padding: 28upx 0;

    .management-item {
      @extend %flex-center;
      width: 120upx;
      height: 120upx;
      border-radius: 10upx;
      font-size: $font-sm;
      color: $font-color-dark;
      position: relative;
    }

    .iconfont {
      font-size: 48upx;
    }
  }

  .cu-list.card-menu {
    margin: $spacing-base 0;

    .title {
      margin-left: $spacing-base;
    }
  }
}

%flex-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

%section {
  justify-content: space-around;
  display: flex;
  align-content: center;
  background: #fff;
  border-radius: 10upx;
}
</style>
