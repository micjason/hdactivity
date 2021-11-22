import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const THEMECOLOR = uni.getStorageSync('themeColor') || {
	title: '天青',
	name: 'cyan',
	color: '#1cbbb4'
};

const USERINFO = uni.getStorageSync('userInfo') || {}

const store = new Vuex.Store({
    state: {
        themeColor: THEMECOLOR,
        userInfo:USERINFO
    },
    getters: {
        themeColor: state => {
			return state.themeColor;
		},
        userInfo: state => {
			return state.userInfo;
		},
    },
    mutations: {
        setThemeColor(state, val) {
			state.themeColor = val;
			uni.setStorageSync('themeColor', val);
		},
        setUserInfo(state, val) {
            state.userInfo = val;
			uni.setStorageSync('userInfo', val);
        }
    },
    actions: {}
})

export default store;