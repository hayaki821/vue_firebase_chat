import Vue from "vue";
import store from "./store";
import App from "./App.vue";
import firebase from "firebase";
import router from "./router";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyCeQsblyVwqDktRO4pxUXvlXfjnYuL9i6w",
  authDomain: "vuefirebasechat-bc957.firebaseapp.com",
  databaseURL: "https://vuefirebasechat-bc957.firebaseio.com",
  projectId: "vuefirebasechat-bc957",
  storageBucket: "vuefirebasechat-bc957.appspot.com",
  messagingSenderId: "626507925000",
  appId: "1:626507925000:web:fbce481c9e60cf54d1f3bd",
  measurementId: "G-NLKL9MZG7D",
};

firebase.initializeApp(firebaseConfig);
Vue.use(BootstrapVue);
export const functions = firebase.functions();
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
