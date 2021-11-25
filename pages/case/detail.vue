<template>
  <div class="detail">
    <image
      :class="['detail-img', overLoad ? 'show' : '']"
      :src="itemInfo.pdf"
      mode="widthFix"
      alt=""
      @load="imgOver"
    ></image>
    <share :itemInfo="itemInfo"></share>
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
    console.log("detail", option);
    this.itemInfo = this.pdfList[option.id * 1 - 1];
    uni.showLoading({
      title: "加载中",
    });
  },
  methods: {
    imgOver(e) {
      console.log("图片加载完毕", e);
      uni.hideLoading();
      this.overLoad = true;
    },
    // readPdf() {
    //   console.log(123123123);
    //   uni.downloadFile({
    //     url: "http://r30p83yzt.hn-bkt.clouddn.com/%E3%80%90%E6%B5%B7%E9%BC%8E%E7%94%9F%E9%B2%9C%E7%89%A9%E6%B5%81%E5%AE%A2%E6%88%B7%E6%A1%88%E4%BE%8B%E3%80%91.pdf",
    //     success: function (res) {
    //       console.log("down", res);
    //       var filePath = res.tempFilePath;
    //       uni.openDocument({
    //         filePath: filePath,
    //         showMenu: true,
    //         success: function (res) {
    //           console.log("打开文档成功");
    //         },
    //         complete: function (done) {
    //           console.log("done", done);
    //         },
    //       });
    //     },
    //     complete: function (done) {
    //       console.log("done", done);
    //     },
    //   });
    // },
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
