<template>
  <div class="room-list">
    <h4>Channels</h4>
    <hr />
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

export default {
  name: "RoomList",
  data() {
    return {
      rooms: []
    };
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
  methods: {
    loadMessages() {
      firebase
        .database()
        .ref("/messages/")
        .on("value", snapshot => {
          if (snapshot) {
            let rootList = snapshot.val();
            let roomList = [];
            Object.keys(rootList).forEach(val => {
              rootList[val].id = val;
              roomList.push(rootList[val].id);
            });
            this.rooms = roomList;
          }
        });
    }
  }
};
</script>