import Vue from 'vue'
import App from '@/aresrpg.vue'
import router from './router'
import VueMq from 'vue-mq'
import Ripple from 'vue-ripple-directive'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.directive('rp', Ripple)
Vue.use(VueMq, {
	breakpoints: {
		sm: 800,
		lg: Infinity,
	},
})

new Vue({
	router,
	methods: {
		// litle npm script to disable body scroll on all devices (because those IOS suckers think different)
		lockScroll: el => disableBodyScroll(el),
		unlockScroll: el => enableBodyScroll(el),
	},
	render: h => h(App),
}).$mount('#app')
