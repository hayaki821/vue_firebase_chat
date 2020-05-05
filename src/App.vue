<template>
  <div id="app">
    <header class="header">
      <div class="header__inner">
        <template v-if="isSignedIn && userName && userPic">
          <div class="header__user-image">
            <img :src="userPic" />
          </div>
          <p class="header__user-name">{{ userName }}</p>
        </template>
        <button class="header__auth-button" @click="authFunction">{{ authButtonText }}</button>
      </div>
      <div class="header__inner">
        <b-button :to="{ name: 'ChatList' }" variant="light">ホームに戻る</b-button>
      </div>
    </header>
    <template v-if="isSignedIn && userName && userPic">
      <router-view></router-view>
    </template>
    <template v-else>
      <main class="main">
        <div class="main__inner">
          <h5>未ログインです</h5>
          <p>上記ログインボタンからログインしてください</p>
        </div>
      </main>
    </template>
  </div>
</template>

<script>
import firebase from "firebase";
/* eslint-disable */
export default {
  name: "App",
  data() {
    return {
      userName: null,
      userPic: null,
      isSignedIn: null,
      authButtonText: null,
      authFunction: function() {}
    };
  },
  created() {
    this.onAuthStateChanged();
  },
  watch: {
    userName: {
      handler(val) {
        // $routeを監視して、変更があるたびにメニューの選択を初期化。
        // immediateを使うことでcreateの後の現在のルートを取得できる
        this.$store.dispatch("userName", val);
      },
      immediate: true
    },
    isSignedIn: {
      handler(val) {
        // $routeを監視して、変更があるたびにメニューの選択を初期化。
        // immediateを使うことでcreateの後の現在のルートを取得できる
        this.$store.dispatch("isSignedIn", val);
      },
      immediate: true
    },
    userPic: {
      handler(val) {
        // $routeを監視して、変更があるたびにメニューの選択を初期化。
        // immediateを使うことでcreateの後の現在のルートを取得できる
        this.$store.dispatch("userPic", val);
      },
      immediate: true
    }
  },
  methods: {
    onAuthStateChanged() {
      firebase.auth().onAuthStateChanged(user => {
        this.userName = user ? this.getUserName() : null;
        this.userPic = user ? this.getProfilePicUrl() : null;
        this.authButtonText = user ? "Sign-out" : "Sign-in with Google";
        this.authFunction = user ? this.signOut : this.signIn;
        this.isSignedIn = user ? true : false;
      });
    },
    signIn() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider);
    },
    signOut() {
      firebase.auth().signOut();
    },
    isUserSignedIn() {
      return !!firebase.auth().currentUser || false;
    },
    getProfilePicUrl() {
      return (
        firebase.auth().currentUser.photoURL ||
        "/static/images/profile_placeholder.png"
      );
    },
    getUserName() {
      return firebase.auth().currentUser.displayName;
    }
  }
};
/* eslint-disable */
</script>

<style lang="scss">
body {
  background-color: #eceff1;
}
.header {
  background-color: #009ce5;
  display: flex;
  &__inner {
    width: 90%;
    height: 70px;
    margin: 0 auto;
    display: flex;
    align-items: center;
  }
  &__user-image {
    position: relative;
    width: 50px;
    height: 50px;
    overflow: hidden;
    border-radius: 50%;
    img {
      width: 100%;
      height: auto;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
  }
  &__user-name {
    margin: 0 15px;
    color: #fff;
  }
  &__auth-button {
    background: #fff;
    border: none;
    border-radius: 50px;
    padding: 5px 10px;
    color: #009ce5;
  }
}
</style>