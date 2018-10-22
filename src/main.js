import Vue from 'vue'
import App from '@/aresrpg.vue'
import router from './router'
import Snotify from 'vue-snotify'
import VueMq from 'vue-mq'
import Ripple from 'vue-ripple-directive';

import './registerServiceWorker'

Vue.config.productionTip = false
Vue.directive('rp', Ripple)
Vue.use(Snotify, {
	toast: {
		maxOnScreen: 1,
		maxAtPosition: 1,
		oneAtTime: true,
		preventDuplicates: true,
	},
})

Vue.use(VueMq, {
	breakpoints: {
		sm: 800,
		lg: Infinity,
	},
})

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
