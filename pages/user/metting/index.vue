<template>
    <div class="userinfo">
        <img class="userinfo-nodata" mode="widthFix" :src="nodata" alt="">
        <span class="userinfo-disc">暂无会议记录</span>
    </div>
</template>
<script>
export default {
    data:function(){
        return {
            nodata:this.$assetsConfig.nodata,
        }
    }
}
</script>
<style lang="scss" scoped>
.userinfo{
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: flex;
    // justify-content: center;
    flex-direction: column;
    align-items: center;
    .userinfo-nodata{
        width: 256rpx;
        margin-top: 50%;
    }
    .userinfo-disc {
        margin-top: 40rpx;
        color: $font-color-light;
    }
}
</style>