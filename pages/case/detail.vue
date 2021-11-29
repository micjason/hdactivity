<template>
  <div class="detail">
    <image
      :class="['detail-img', overLoad ? 'show' : '']"
      :src="itemInfo.pdf"
      mode="widthFix"
      alt=""
      @load="imgOver"
    ></image>
    <share v-if="overLoad" :itemInfo="itemInfo"></share>
  </div>
</template>
<script>
import share from "@/components/share";
import pdfList from "@/api/list";
export default {
  data: function () {
    return {
      pdfList,
      itemInfo: {},
      overLoad: false,
    };
  },
  components: {
    share,
  },
  onLoad: function (option) {
    this.itemInfo = this.pdfList[option.id * 1 - 1];
    uni.showLoading({
      title: "加载中",
    });
  },
  methods: {
    imgOver(e) {
      uni.hideLoading();
      this.overLoad = true;
    }
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
.detail {
  width: 100%;
  .detail-img {
    width: 100%;
    opacity: 0;

    &.show {
      opacity: 1;
    }
  }
}
</style>
