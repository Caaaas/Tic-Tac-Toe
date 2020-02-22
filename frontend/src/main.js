import Vue from 'vue'
import App from './App.vue'
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';

Vue.config.productionTip = false

const socket = io('/');
 
Vue.use(VueSocketIOExt, socket);

new Vue({
    render: h => h(App),
}).$mount('#app')
