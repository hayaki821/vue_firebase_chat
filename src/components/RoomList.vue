<template>
  <div class="room-list">
    <h4>Channels</h4>
    <hr />
    <b-button variant="primary" class="mb-3" @click="showChange()">部屋を新規追加</b-button>
    <div id="overlay" v-if="show">
      <addRoom :show="show" @closeNewRoom="closeNewRoom()" @save="save" />
    </div>
    <b-list-group>
      <b-list-group-item
        v-for="room in rooms"
        :key="room"
        :to="{ name: 'Chat',params: { chatname: room } }"
      ># {{ room }}</b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import firebase from "firebase";
import addRoom from "@/components/add_room";
/* eslint-disable */
export default {
  name: "RoomList",
  data() {
    return {
      rooms: [],
      show: false,
      isSignedIn: false,
      userName: null,
      userPic: null
    };
  },
  components: {
    addRoom
  },
  created() {
    this.loadMessages();
  },
  watch: {
    rooms: {
      handler(val) {
        // $routeを監視して、変更があるたびにメニューの選択を初期化。
        // immediateを使うことでcreateの後の現在のルートを取得できる
        this.$store.dispatch("roomList", val);
      },
      immediate: true
    }
  },
  mounted() {
    this.initUser();
  },
  methods: {
    loadMessages() {
      firebase
        .database()
        .ref("/room_names/")
        .on("value", snapshot => {
          if (snapshot) {
            let rootList = snapshot.val();
            let roomList = [];
            if (rootList) {
              console.log(rootList);
              Object.keys(rootList).forEach(val => {
                console.log(val);
                let roomName = rootList[val]["roomname"];
                roomList.push(roomName);
              });
            }
            this.rooms = roomList;
          }
        });
    },
    showChange() {
      this.show = !this.show;
    },
    closeNewRoom() {
      this.show = false;
    },
    save(v) {
      let roomName = v;
      console.log(roomName);
      console.log(this.userName);

      firebase
        .database()
        .ref("/room_names/")
        .push({
          roomname: roomName
        })
        .then(data => {
          this.errorMessage = null;
          this.message = null;
          this.show = !this.show;
          alert(v + "の追加が完了しました");
        })
        .catch(error => {
          this.errorMessage = "正しく入力してください";
        });
    },
    initUser() {
      this.userName = this.$store.getters.getUserName;
      this.isSignedIn = this.$store.getters.getIsSignedIn;
      this.userPic = this.$store.getters.getUserPic;
    }
  }
};
/* eslint-disable */
</script>
<style>
#overlay {
  /*要素を重ねた時の順番*/
  z-index: 1;

  /*画面全体を覆う設定*/
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  /*画面の中央に要素を表示させる設定*/
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>