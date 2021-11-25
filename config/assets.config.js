import indexConfig from './index.config.js';
const PATH = indexConfig.assetsPath;

export default {
	// 默认头像
	headImg: PATH + '/assets/missing-face.png',

	// 海报默认昵称
	userNickName:'微信用户',

	// 海报默认长按解决方案
	postLongpess:'长按识别小程序码，解锁更多云上资源',

	// 海报背景图
	postBg:PATH + '/assets/post-bg.png',

	// 用户背景
	userBg: PATH + '/assets/user-bg.png',

	// vip背景
	vipCardBg: PATH + '/assets/vip-card.png',

	// 弧形背景
	arc: PATH + '/assets/arc.png',

	// 小程序二维码
	miniCode:PATH + '/assets/code.png',

};
