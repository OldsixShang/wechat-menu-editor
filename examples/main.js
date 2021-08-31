import Vue from 'vue'
import App from './App.vue'
import WechatMenuEditor from '../packages/index'

Vue.use(WechatMenuEditor);
Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')