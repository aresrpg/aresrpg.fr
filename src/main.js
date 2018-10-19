import Vue from 'vue'
import App from '@v/aresRpg.vue'
import router from './router'
import AsyncComputed from 'vue-async-computed'
import './registerServiceWorker'
import isMobile from 'ismobilejs'

Vue.config.productionTip = false
Vue.use(AsyncComputed)

new Vue({
	router,
	methods: {
		isMobile: () => isMobile.any,
	},
	render: h => h(App),
}).$mount('#app')
