<template>
  <div class="chat-dashboard">
    <b-container fluid class="ld-over">
      <div class="ld ld-ring ld-spin"></div>
      <b-row>
        <b-col cols="2">
          <RoomList />
        </b-col>

        <b-col cols="8">
          <b-row>
            <b-col id="chat-content">
              <router-view></router-view>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import RoomList from "@/components/RoomList.vue";
// import MessageForm from "@/components/MessageForm.vue";

export default {
  name: "ChatDashBoard",
  components: {
    RoomList
    // MessageForm
  }
};
</script>