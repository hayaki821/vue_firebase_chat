<template>
  <b-jumbotron class="w-50">
    <h3>部屋の新規追加</h3>
    <b-form @submit.prevent="onSubmit">
      <b-form-group id="input-group-1" label-for="input-1" label="New Room Name:">
        <b-form-input id="input-1" required v-model="roomName"></b-form-input>
      </b-form-group>
      <b-button variant="primary" type="submit">追加する</b-button>
    </b-form>
    <b-button variant="danger" @click.prevent="closeNewRoom" class="my-2">閉じる</b-button>
  </b-jumbotron>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      roomName: ""
    };
  },

  methods: {
    closeNewRoom() {
      this.$emit("closeNewRoom");
    },
    onSubmit() {
      this.$emit("save", this.roomName);
    }
  }
};
</script>