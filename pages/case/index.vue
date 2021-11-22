<template>
  <view class="case">
    <template v-for="(item, index) in pdfList">
      <view tap="readPdf">
        <item-style1 :itemInfo="item"></item-style1>
      </view>
    </template>
  </view>
</template>
<script>
import itemStyle1 from "@/components/item-style1";
export default {
  data() {
    return {
      pdfList: [
        {
          title: "浙江联华配送中心“货到人”拣选案例",
          img: require("@/static/img/pdf/1.jpeg"),
          author: "神秘前端",
          time: "2小时前",
        },
        {
          title: "海鼎母婴行业解决方案爱婴室",
          img: require("@/static/img/pdf/2.jpeg"),
          author: "爱婴室",
          time: "2小时前",
        },
        {
          title: "海鼎美妆行业解决方案",
          img: require("@/static/img/pdf/3.jpeg"),
          author: "娇兰佳人",
          time: "2小时前",
        },
        {
          title: "海鼎快时尚行业解决方案",
          img: require("@/static/img/pdf/4.jpeg"),
          author: "名创优品",
          time: "2小时前",
        },
        {
          title: "海鼎生鲜物流客户案例",
          img: require("@/static/img/pdf/5.jpeg"),
          author: "鲜丰水果",
          time: "2小时前",
        },
        {
          title: "海鼎生鲜零售解决方案",
          img: require("@/static/img/pdf/6.jpeg"),
          author: "神秘前端",
          time: "2小时前",
        },
      ],
    };
  },
  components: {
    itemStyle1,
  },
  methods: {
    readPdf() {
      console.log(123);
      uni.downloadFile({
        url: "http://172.17.7.46:5555/1.pdf",
        success: function (res) {
          console.log("down", res);
          var filePath = res.tempFilePath;
          uni.openDocument({
            filePath: filePath,
            showMenu: true,
            success: function (res) {
              console.log("打开文档成功");
            },
            complete: function (done) {
              console.log("done", done);
            },
          });
        },
        complete: function (done) {
          console.log("done", done);
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped></style>
