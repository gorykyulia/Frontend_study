<template>
<dialog id="dialogCreate">
  <div>
    <label for="nameField">Name: </label>
    <input id="nameField" type="text" v-model.trim="name">
  </div>
  <div>
    <label for="descrField">Description: </label>
    <input id="descrField" type="text" v-model.trim="description">
  </div>
  <div>
    <button @click="addOrder">Add</button>
    <button @click="closeDialog">Cancel</button>
  </div>
</dialog>
</template>

<script>
import ordersListService from './ordersListService';

export default {
  name: "dialogAddOrder",
  data: function() {
    return {
      name: "",
      description: ""
    }
  },
  
  methods: {
    closeDialog() {
      this.$emit('closeDialog');
      this.clearFields();
    },
    addOrder() {
      ordersListService.addOrder(this.name, this.description);
      this.closeDialog();
    },
    clearFields() {
      this.name = "",
      this.description = ""
    }
  }
}
</script>

<style>
dialog {
  top: 50%;
  transform: translate(0, -50%);
}

dialog input {
  margin-bottom: 10px;
}
</style>
