<template>
  <div class="case">
    <swiper
      class="screen-swiper round-dot"
      :indicator-dots="true"
      :circular="true"
      :autoplay="true"
      interval="5000"
      duration="500"
    >
      <swiper-item v-for="(item, index) in pdfList.slice(0, 3)" :key="index" @click="jumpDetail(item.id)">
        <image
          :src="item.img"
          mode="aspectFill"
        ></image>
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
};
</script>
<style lang="scss" scoped></style>
