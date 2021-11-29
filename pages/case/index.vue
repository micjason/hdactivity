<template>
  <div class="case">
    <!-- round-dot -->
    <swiper
      class="screen-swiper square-dot"
      :indicator-dots="true"
      :circular="true"
      :autoplay="true"
      interval="5000"
      duration="500"
    >
      <swiper-item
        v-for="(item, index) in pdfList.slice(0, 3)"
        :key="index"
        @click="jumpDetail(item.id)"
      >
        <image :src="item.img" mode="aspectFill"></image>
      </swiper-item>
    </swiper>
    <div v-for="item in pdfList" :key="item.id">
      <item-style :itemInfo="item"></item-style>
    </div>
  </div>
</template>
<script>
import itemStyle from "@/components/item-style";
import pdfList from "@/api/list";
export default {
  data() {
    return {
      pdfList,
      logoImg: this.$assetsConfig.logoImg,
    };
  },
  components: {
    itemStyle,
  },
  methods: {
    jumpDetail(id) {
      if (!id) return;
      uni.navigateTo({
        url: `/pages/case/detail?id=${id}`,
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
<style lang="scss" scoped></style>
