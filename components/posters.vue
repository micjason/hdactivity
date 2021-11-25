<template>
  <div class="poster-modal" @touchmove.stop.prevent="moveHandle">
    <div class="poster-modal-wrapper" :class="{ show: loading }">
      <div class="poster-dialog" @longpress="showTips">
        <r-canvas ref="rCanvas"></r-canvas>
      </div>
      <div class="poster-longpress">长按图片保存到相册</div>
      <div class="poster-dismmiss" @click="hideModel">
        <div class="poster-dismmiss-icon" hover-class="poster-hover">
          <img :src="img_dismiss" alt="删除" />
        </div>
      </div>
    </div>
    <div v-if="showBottom" class="poster-mask"></div>
    <div class="poster-share" :class="{ show: showBottom }">
      <div class="p-s-save b-b" @click.stop.prevent="saveImage">保存图片</div>
      <div class="p-s-dismiss" @click.stop.prevent="showBottom = false">
        取消
      </div>
    </div>
  </div>
</template>
<script>
import rCanvas from "@/components/r-canvas/r-canvas.vue";
import utils from "@/static/js/utils.js";
export default {
  data: function () {
    return {
      img_dismiss: require("@/static/assets/img/dismiss.png"),
      userBg: this.$assetsConfig.userBg,
      userNickName: this.$assetsConfig.userNickName,
      postBg: this.$assetsConfig.postBg,
      miniCode: this.$assetsConfig.miniCode,
      postLongpess: this.$assetsConfig.postLongpess,
      showBottom: false,
      tempFilePath: "",
      loading: false,
    };
  },
  props: {
    canvasInfo: {
      type: Object,
      default: {
        title: "",
        disc: "",
      },
    },
  },
  components: {
    rCanvas,
  },
  onReady() {
    this.showModel();
    console.log(1111,this.$store.state.userInfo);
  },
  methods: {
    showModel() {
      const that = this;
      uni.showLoading({
        title: "正在生成海报...",
      });

      // 如果下面代码执行失败，确保关闭loading
      setTimeout(function () {
        uni.hideLoading();
      }, 5000);

      that.$nextTick(async () => {
        // 初始化
        await that.$refs.rCanvas.init({
          canvas_id: "rCanvas",
          scale: 1,
          canvas_width: 320,
          canvas_height: 430,
        });

        // 画图
        await that.$refs.rCanvas
          .drawImage({
            url: that.postBg,
            x: 0,
            y: 0,
            w: 320,
            h: 330,
          })
          .catch((err_msg) => {
            uni.showToast({
              title: err_msg,
              icon: "none",
            });
          });

        // 画title
        await that.$refs.rCanvas
          .drawText({
            text: that.canvasInfo.title,
            max_width: 0,
            x: 30,
            y: 100,
            font_color: "rgb(255, 255, 255)",
            font_size: 20,
            max_width: 220,
            line_clamp: 2,
            line_clamp_hint: "...",
            line_height: 24,
          })
          .catch((err_msg) => {
            uni.showToast({
              title: err_msg,
              icon: "none",
            });
          });

        // 画disc
        await that.$refs.rCanvas
          .drawText({
            text: that.canvasInfo.disc[0],
            max_width: 0,
            x: 30,
            y: 150,
            font_color: "rgb(175, 174, 175)",
            font_size: 14,
            max_width: 200,
            line_clamp: 2,
            line_clamp_hint: "...",
            line_height: 20,
          })
          .catch((err_msg) => {
            uni.showToast({
              title: err_msg,
              icon: "none",
            });
          });

        // 画用户头像
        await that.$refs.rCanvas
          .drawImage({
            url: that.$store.state.userInfo.avatarUrl || that.userBg,
            x: 15,
            y: 345,
            w: 40,
            h: 40,
            border_radius: 20,
          })
          .catch((err_msg) => {
            uni.showToast({
              title: err_msg,
              icon: "none",
            });
          });

        // 画用户昵称
        await that.$refs.rCanvas
          .drawText({
            text: that.$store.state.userInfo.nickName || that.userNickName,
            x: 65,
            y: 370,
            font_color: "rgb(175, 174, 175)",
            font_size: 16,
            max_width: 150,
            line_clamp: 1,
            line_clamp_hint: "...",
            line_height: 20,
          })
          .catch((err_msg) => {
            uni.showToast({
              title: err_msg,
              icon: "none",
            });
          });

        // 画使用介绍
        await that.$refs.rCanvas
          .drawText({
            text: that.postLongpess,
            x: 15,
            y: 410,
            font_color: "#ccc",
            font_size: 12,
            line_height: 20,
          })
          .catch((err_msg) => {
            uni.showToast({
              title: err_msg,
              icon: "none",
            });
          });

        // 画小程序二维码
        await that.$refs.rCanvas
          .drawImage({
            url: that.miniCode,
            x: 231,
            y: 340,
            w: 74,
            h: 74,
          })
          .catch((err_msg) => {
            uni.showToast({
              title: err_msg,
              icon: "none",
            });
          });

        // 生成海报
        await that.$refs.rCanvas.draw((res) => {
          //res.tempFilePath：生成成功，返回base64图片
          uni.hideLoading();
          that.loading = true;
          that.tempFilePath = res.tempFilePath;

          // 如果要保存图片，执行下面语句
          // that.$refs.rCanvas.saveImage(res.tempFilePath);
        });
      });
    },
    hideModel() {
      utils.throttle(this.handleHideModel(), 3000);
    },
    handleHideModel() {
      console.log("handleHideModel", 111111);
      // this.$refs.rCanvas.clearCanvas();
      this.$emit("hidePoster");
    },
    showTips() {
      this.showBottom = true;
    },
    saveImage() {
      const that = this;
      if (that.tempFilePath === "") {
        uni.showToast({
          title: "生成海报后保存",
          duration: 1500,
          icon: "error",
        });
        return false;
      }

      uni.getSetting({
        success(res) {
          if (!res.authSetting["scope.writePhotosAlbum"]) {
            //判断权限，未授权过
            uni.authorize({
              //获取权限
              scope: "scope.writePhotosAlbum",
              success() {
                that.$refs.rCanvas
                  .saveImage(that.tempFilePath)
                  .then((result) => {
                    if ((result.errMsg = "saveImageToPhotosAlbum:ok")) {
                      uni.showToast({
                        title: "保存成功",
                        duration: 1500,
                        success: function () {
                          that.showBottom = false;
                        },
                      });
                    }
                  })
                  .catch(() => {
                    uni.showToast({
                      title: "保存失败",
                      duration: 1500,
                      icon: "error",
                      success: function () {
                        that.showBottom = false;
                      },
                    });
                  });
              },
              fail() {
                uni.showToast({
                  title: "请授权后再保存",
                  icon: "error",
                  duration: 1500,
                  success: function () {
                    that.showBottom = false;
                  },
                });
              },
            });
          } else {
            that.$refs.rCanvas
              .saveImage(that.tempFilePath)
              .then((result) => {
                console.log("result", result);
                if ((result.errMsg = "saveImageToPhotosAlbum:ok")) {
                  uni.showToast({
                    title: "保存成功",
                    duration: 1500,
                    success: function () {
                      that.showBottom = false;
                    },
                  });
                }
              })
              .catch((err) => {
                console.log("err", err);
                uni.showToast({
                  title: "保存失败",
                  duration: 1500,
                  icon: "error",
                  success: function () {
                    that.showBottom = false;
                  },
                });
              });
          }
        },
      });
    },
    // 禁止遮罩层后面的滚动事件
    moveHandle() {},
  },
};
</script>
<style lang="scss" scoped>
.poster-modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1110;
  opacity: 1;
  outline: 0;
  background: rgba(0, 0, 0, 0.6);
  overflow-x: hidden;
  overflow-y: auto;
  pointer-events: auto;

  .poster-modal-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity: 0;
    overflow: hidden;
    pointer-events: auto;

    &.show {
      opacity: 1;
      pointer-events: auto;
    }

    .poster-dialog {
      position: relative;
      width: 640upx;
      height: 860rpx;
      max-width: 100%;
      border-radius: 20rpx;
      overflow: hidden;
    }

    .poster-longpress {
      font-size: 26rpx;
      line-height: 60rpx;
      color: #fff;
      padding: 0 42rpx;
      border-radius: 30rpx;
      background: rgba(0, 0, 0, 0.3);
      margin-top: 28rpx;
    }

    .poster-dismmiss {
      padding: 20rpx;
      margin-top: 28rpx;

      .poster-dismmiss-icon {
        width: 68rpx;
        height: 68rpx;
        border-radius: 34rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        border: 1rpx solid #fff;
        &.poster-hover {
          border: 1rpx solid #ccc;
        }

        img {
          width: 22rpx;
          height: 22rpx;
        }
      }
    }
  }

  .poster-mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2000;
    outline: 0;
    background: rgba(0, 0, 0, 0.4);
    // pointer-events属性
    // auto——效果和没有定义pointer-events属性相同，鼠标不会穿透当前层。
    // 在SVG中，该值和visiblePainted的效果相同。
    // none——元素不再是鼠标事件的目标，鼠标不再监听当前层而去监听下面的层中的元素。
    // 但是如果它的子元素设置了pointer-events为其它值，比如auto，鼠标还是会监听这个子元素的。
    pointer-events: auto;
    overflow: hidden;
  }

  .poster-share {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2001;
    outline: 0;
    background: #fff;
    transition: all 0.3s ease-in-out 0s;
    margin-bottom: -1000upx;
    border-top-right-radius: 20rpx;
    border-top-left-radius: 20rpx;

    &.show {
      margin-bottom: 0;
    }

    .p-s-save {
      font-size: 28rpx;
      line-height: 98rpx;
      text-align: center;
      position: relative;
      color: #000;
      &.b-b:after {
        left: $page-row-spacing;
        right: $page-row-spacing;
      }
    }
    .p-s-dismiss {
      font-size: 28rpx;
      line-height: 78rpx;
      text-align: center;
      color: #000;
      padding-bottom: 50rpx;
    }
  }
}
</style>
