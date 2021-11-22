<template>
	<view>
		<view class="r-canvas-component" :style="{width:canvas_width+'px',height:canvas_height+'px'}" :class="{'hidden':hidden}">
			<canvas class="r-canvas" v-if="canvas_id" :canvas-id="canvas_id" :id="canvas_id" :style="{width:canvas_width+'px',height:canvas_height+'px'}"></canvas>
		</view>
	</view>
</template>

<script>
	import rCanvasJS from "./r-canvas.js"
	console.log('rCanvasJS',rCanvasJS);
	export default {
		mixins:[rCanvasJS],
		mounted(){
			console.log('123',this.canvas_width)
		}
	}
</script>
<style>
.r-canvas{
	transform-origin: 0 0;
}
.r-canvas-component{
	overflow: hidden;
}
.r-canvas-component.hidden{
	position: fixed;
	top:-5000upx;
}
</style>
