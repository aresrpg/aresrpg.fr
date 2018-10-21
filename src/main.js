import Vue from 'vue'
import App from '@v/aresRpg.vue'
import router from './router'
import AsyncComputed from 'vue-async-computed'
import './registerServiceWorker'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import isMobile from 'ismobilejs'
import Vuetify from 'vuetify'

Vue.config.productionTip = false
Vue.use(AsyncComputed)
Vue.use(Vuetify)

new Vue({
	router,
	methods: {
		isMobile: () => isMobile.any,
	},
	render: h => h(App),
}).$mount('#app')
