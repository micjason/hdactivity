<template>
  <view>
    <!-- <web-view
      :webview-styles="webviewStyles"
      src="http://172.17.7.46:5555/demo.html"
    ></web-view> -->
	<button @click="readPdf">打开pdf</button>
	
  </view>
</template>
<script>
export default {
  data() {
    return {
      webviewStyles: {
        progress: {
          color: "#FF3333",
        },
      },
    };
  },
  components:{
	  
  },
  methods: {
    // readPdf() {
    //   const fs = wx.getFileSystemManager();
    //   // fs.readFile({
    //   //   filePath: `${wx.env.USER_DATA_PATH}/hello.txt`,
    //   //   encoding: 'utf8',
    //   //   position: 0,
    //   //   success(res) {
    //   //     console.log(res.data)
    //   //   },
    //   //   fail(res) {
    //   //     console.error(res)
    //   //   }
    //   // })

    //   // 同步接口
    //   try {
    //     const res = fs.readFileSync("demo.pdf");
    //     console.log(res);
    //   } catch (e) {
    //     console.error(e);
    //   }
    // },
    readPdf() {
    	console.log(123);
      uni.downloadFile({
        url: "http://172.17.7.46:5555/1.pdf",
        success: function (res) {
    		console.log('down',res);
          var filePath = res.tempFilePath;
          uni.openDocument({
            filePath: filePath,
            showMenu: true,
            success: function (res) {
              console.log("打开文档成功");
            },
    		complete:function(done){
    			console.log('done',done);
    		}
          });
        },
    	complete:function(done){
    			console.log('done',done);
    		}
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.t-icon {
  width: 30px;
  height: 30px;
}
</style>
