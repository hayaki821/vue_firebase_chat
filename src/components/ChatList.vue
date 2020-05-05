<template>
  <div class="room-list">
    <h4>Chat list</h4>
    <hr />
    <b-list-group>
      <b-list-group-item v-for="chat in chats" :key="chat.name">
        <b-button :to="{ name: 'Chat',params: { chatname: chat.roomname } }" class="w-100">
          <h5># {{ chat.roomname }}</h5>
          <p>最終メッセージ：{{chat.message.text}}</p>
        </b-button>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "ChatList",
  data() {
    return {
      chats: []
    };
  },
  created() {
    this.loadMessages();
  },
  methods: {
    loadMessages() {
      firebase
        .database()
        .ref("/messages/")
        .on("value", snapshot => {
          if (snapshot) {
            console.log(snapshot);
            let rootList = snapshot.val();
            let ChatList = [];
            Object.keys(rootList).forEach(key => {
              let key_array = Object.keys(rootList[key]);
              let key_len = key_array.length;
              let last_message = rootList[key][key_array[key_len - 1]];
              let messages = {
                roomname: key,
                message: last_message
              };
              ChatList.push(messages);
            });
            this.chats = ChatList;
          }
        });
    }
  }
};
</script>