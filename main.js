import App from './App'
import Vue from 'vue'
// 引入全局存储
import store from '@/store';

// 引入全局配置
import $themeConfig from '@/config/theme.config.js';
import $mycentConfig from '@/config/mycent.config.js';
import $indexConfig from '@/config/index.config.js';
import $assetsConfig from '@/config/assets.config.js';
import $setListConfig from '@/config/setList.config.js';
// 挂载全局自定义方法
Vue.prototype.$store = store;

Vue.prototype.$themeConfig = $themeConfig
Vue.prototype.$mycentConfig = $mycentConfig
Vue.prototype.$indexConfig = $indexConfig
Vue.prototype.$assetsConfig = $assetsConfig
Vue.prototype.$setListConfig = $setListConfig

Vue.mixin({
	computed: {
		themeColor: {
			get () {
				return store.getters.themeColor;
			},
			set (val) {
				store.state.themeColor = val;
			}
		},
		userInfo:{
			get () {
				return store.getters.userInfo;
			},
			set (val) {
				store.state.userInfo = val;
			}
		}
	}
});

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
