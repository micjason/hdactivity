<template>
	<view class="item">
		<view class="item-left"><image class="item-img" :src="itemInfo.img"></image></view>
		<view class="item-right">
			<text class="item-title">{{ itemInfo.title }}</text>
			<view class="item-wrapper">
				<text class="item-author">{{ itemInfo.author }}</text>
				<text class="item-time">{{ itemInfo.time }}</text>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	props: {
		itemInfo: {
			type: Object,
			default: function() {
				return {
					id: 1,
					title: '别再玩手机了，赶紧学前端，晚一年能少掉5根头发',
					author: '神秘前端',
					time: '2小时前',
					img: 'http://fc-feed.cdn.bcebos.com/0/pic/9107b498a0cbea000842763091e833b6.jpg'
				};
			}
		}
	},
	data() {
		return {};
	},
	methods: {}
};
</script>
<style lang="scss" scoped>
.item {
	width: 750rpx;
	padding: 24rpx 30rpx;
	border-bottom-width: 1px;
	border-color: #eee;
	background-color: #fff;
	position: relative;
	display: flex;
	.item-left {
		flex-basis: 220rpx;
		height: 140rpx;
		flex-shrink: 0;
		background: #fff;
		overflow: hidden;
		.item-img {
			width: 100%;
		}
	}
	.item-right {
		flex: 1;
		padding-left: 16rpx;
		.item-title {
			font-size: 32rpx;
			line-height: 46rpx;
			color: #303133;
			display: -webkit-box;
			overflow: hidden;
			text-overflow: ellipsis;
			word-wrap: break-word;
			white-space: normal !important;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		.item-wrapper {
			margin-top: 20rpx;
			font-size: 26rpx;
			color: #aaa;
			.item-author {
			}
			.item-time {
				margin-left: 20rpx;
			}
		}
	}
}
</style>
