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
/* eslint-disable */
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
      this.roomName = this.roomName.replace(/\s+/g, "");
      var reg = new RegExp(/[!"#$%&'()\*\+\-\.,\/:;<=>?@\[\\\]^_`{|}~][\s\S]/g);
      if (reg.test(this.roomName) || !this.roomName) {
        alert("特殊文字が含まれています");
      } else {
        this.$emit("save", this.roomName);
      }
    },
    invalidFeedback(index, data = null) {
      const valid = this.fields_data[Number(index)].invalid || [];
      // バリデーションルールはここで設定
      if (!Array.isArray(valid)) return "";
      if (valid.indexOf("require") >= 0 && !!data) {
        return "必須入力です";
      }
    }
  }
};
/* eslint-disable */
</script>