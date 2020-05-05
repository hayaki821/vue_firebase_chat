<template>
  <main>
    <div class="chat-area">
      <div class="conversation">
        <ul class="conversation__inner">
          <li v-for="list in messageList" :key="list.id">
            <div class="conversation__user-image">
              <img :src="list.profilePicUrl" alt />
            </div>
            <div class="conversation__col">
              <p class="conversation__user-name">{{list.name}}</p>
              <p class="conversation__user-text">{{list.text}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="post">
        <input type="text" class="post__text" v-model="message" />
        <button type="button" class="post__button" @click="postMessage">送信</button>
        <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
      </div>
    </div>
  </main>
</template>

<script>
import firebase from "firebase";
/* eslint-disable */
export default {
  name: "Chat",
  data() {
    return {
      message: null,
      errorMessage: null,
      messageList: [],
      isSignedIn: false,
      userName: null,
      userPic: null
    };
  },
  created() {
    this.loadMessages();
  },
  watch: {
    $route: {
      handler(val) {
        // $routeを監視して、変更があるたびにメニューの選択を初期化。
        // immediateを使うことでcreateの後の現在のルートを取得できる
        this.loadMessages();
      },
      immediate: true
    }
  },
  mounted() {
    this.initUser();
  },
  methods: {
    postMessage() {
      let that = this;
      let param = this.$route.params["chatname"];
      if (!that.isSignedIn || !that.message) return;
      firebase
        .database()
        .ref("/messages/")
        .child(param)
        .push({
          name: that.userName,
          text: that.message,
          profilePicUrl: that.userPic
        })
        .then(data => {
          that.errorMessage = null;
          that.message = null;
        })
        .catch(error => {
          that.errorMessage = "正しく入力してください";
        });
    },
    loadMessages() {
      let param = this.$route.params["chatname"];
      let roomList = this.$store.getters.getRoomList;
      if (!roomList.includes(param)) {
        this.gohome();
        alert("存在している部屋を選択してください");
        return;
      }
      firebase
        .database()
        .ref("/messages/")
        .child(param)
        .on("value", snapshot => {
          if (snapshot) {
            let rootList = snapshot.val();
            let messageList = [];
            if (rootList) {
              Object.keys(rootList).forEach(val => {
                rootList[val].id = val;
                messageList.push(rootList[val]);
              });
              this.messageList = messageList;
            }
          }
        });
    },
    initUser() {
      this.userName = this.$store.getters.getUserName;
      this.isSignedIn = this.$store.getters.getIsSignedIn;
      this.userPic = this.$store.getters.getUserPic;
    },
    gohome() {
      this.$router.push({ path: "/" }, () => {});
    }
  }
};
/* eslint-disable */
</script>

<style scoped lang="scss">
.chat-area {
  background-color: #fff;
  border-radius: 50px;
  max-width: 500px;
  width: 90%;
  box-sizing: border-box;
  padding: 25px 35px;
  margin: 20px 5% 0;
}
.conversation {
  width: 100%;
  height: calc(100vh - 200px);
  margin-bottom: 10px;
  overflow: auto;
  display: grid;
  grid-template-rows: 1fr;
  &__inner {
    padding: 0;
    margin: 0;
    width: 100%;
    grid-row-start: 2;
    > li {
      list-style: none;
      &:nth-child(n + 2) {
        margin-top: 20px;
      }
    }
  }
  &__user-image {
    position: relative;
    width: 40px;
    height: 40px;
    overflow: hidden;
    border-radius: 50%;
    float: left;
    img {
      width: 100%;
      height: auto;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
  }
  &__col {
    margin-left: 50px;
  }
  &__user-name {
    margin: 0 0 5px;
    color: #878787;
  }
}
.post {
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  input {
    width: 80%;
    height: 35px;
  }
  button {
    width: 20%;
    height: 35px;
    background: #fff;
    border: 1px solid #878787;
    color: #878787;
  }
}
.error-message {
  color: #f00;
  font-size: 0.8em;
  margin: 5px 0 0;
  position: absolute;
  left: 0;
  bottom: 0;
  transform: translateY(100%);
}
</style>