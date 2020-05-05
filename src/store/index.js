import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const initialState = {
  user: [],
  room: [],
};

export default new Vuex.Store({
  state: initialState,
  mutations: {
    setUserName(state, data) {
      state.user.userName = data;
    },
    setIsSignedIn(state, data) {
      state.user.isSignedIn = data;
    },
    setUserPic(state, data) {
      state.user.userPic = data;
    },
    setRoomList(state, data) {
      state.room = data;
    },
  },
  actions: {
    userName(state, data) {
      // 非同期処理や外部APIと通信など
      this.commit("setUserName", data);
    },
    isSignedIn(state, data) {
      // 非同期処理や外部APIと通信など
      this.commit("setIsSignedIn", data);
    },
    userPic(state, data) {
      // 非同期処理や外部APIと通信など
      this.commit("setUserPic", data);
    },
    roomList(state, data) {
      this.commit("setRoomList", data);
    },
  },
  getters: {
    getUserName(state) {
      return state.user.userName ? state.user.userName : null;
    },
    getIsSignedIn(state) {
      return state.user.isSignedIn ? state.user.isSignedIn : null;
    },
    getUserPic(state) {
      return state.user.userPic ? state.user.userPic : null;
    },
    getRoomList(state) {
      return state.room ? state.room : null;
    },
  },
});
