<script>
export default {
  onLaunch: function () {
    console.log("App Launch");
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style lang="scss">
// 导入colorUI
@import '/static/colorui/main.css';
@import '/static/colorui/icon.css';
@import '/static/colorui/animation.css';

/* 单色图标和多色图标
单色图标每次增加项目，重新生成代码覆盖
多色的需要下载源文件，执行iconfont-tools进行编译 */
@import "./static/iconfont/iconfont.css";
@import "./static/iconfont/iconfont-weapp-icon.css";

/* 初始化和主题样式 */
@import "./static/css/reset.scss";
@import "./static/css/uni.scss";
</style>
