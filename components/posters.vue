<template>
  <div class="posters-mask">
    <div class="poster">
      <r-canvas ref="rCanvas"></r-canvas>
    </div>
  </div>
</template>
<script>
import rCanvas from "@/components/r-canvas/r-canvas.vue";
export default {
  data: function () {
    return {};
  },
  components: {
    rCanvas,
  },
  onReady() {
    this.$nextTick(async () => {
      // 初始化
      await this.$refs.rCanvas.init({
        canvas_id: "rCanvas",
        scale:1,
        canvas_width: 320,
        canvas_height: 460,
      });

      // 画图
      await this.$refs.rCanvas
        .drawImage({
          url: "/static/img/pdf/1.jpeg",
          x: 0,
          y: 0,
          w: 320,
          h: 390,
        })
        .catch((err_msg) => {
          uni.showToast({
            title: err_msg,
            icon: "none",
          });
        });

      // 画文字
      await this.$refs.rCanvas
        .drawText({
          text: "浙江联华配送中心“货到人”拣选案例",
          max_width: 0,
          x: 38,
          y: 150,
          font_color: "rgb(175, 174, 175)",
          font_size: 18,
        })
        .catch((err_msg) => {
          uni.showToast({
            title: err_msg,
            icon: "none",
          });
        });

      // 画用户头像
      await this.$refs.rCanvas
        .drawImage({
          url: uni.getStorageSync("userInfo").avatarUrl,
          x: 20,
          y: 405,
          w: 20,
          h: 20,
          border_radius: 10,
        })
        .catch((err_msg) => {
          uni.showToast({
            title: err_msg,
            icon: "none",
          });
        });

      // 画用户昵称
      await this.$refs.rCanvas
        .drawText({
          text: uni.getStorageSync("userInfo").nickName,
          x: 45,
          y: 419,
          font_color: "rgb(175, 174, 175)",
          font_size: 14,
          line_height: 20,
        })
        .catch((err_msg) => {
          uni.showToast({
            title: err_msg,
            icon: "none",
          });
        });

      // 画使用介绍
      await this.$refs.rCanvas
        .drawText({
          text: "长按识别小程序码，解锁更多云上资源",
          x: 20,
          y: 445,
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
      await this.$refs.rCanvas
        .drawImage({
          url: uni.getStorageSync("userInfo").avatarUrl,
          x: 250,
          y: 400,
          w: 50,
          h: 50,
          border_radius: 10,
        })
        .catch((err_msg) => {
          uni.showToast({
            title: err_msg,
            icon: "none",
          });
        });

      // 生成海报
      await this.$refs.rCanvas.draw((res) => {
        //res.tempFilePath：生成成功，返回base64图片
        // 保存图片
        // this.$refs.rCanvas.saveImage(res.tempFilePath);
      });
    });
  },
};
</script>
<style lang="scss" scoped>
.posters-mask {
  content: "";
	width: 100%;
	height: 100%;
	display: block;
	background-color: rgba(0, 0, 0, 0.4);
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
  display: flex;
  justify-content: center;
  align-content: center;
  .poster{
    width: 320px;
    height: 460px;
    overflow: hidden;
  }
}
</style>
