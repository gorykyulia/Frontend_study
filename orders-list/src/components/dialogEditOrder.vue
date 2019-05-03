<template>
  <dialog id="dialogEdit">
    <div>
      <label>
        Id:
        <input type="number" v-model="order.id">
      </label>
    </div>
    <div>
      <label>
        Name:
        <input type="text" v-model="order.name">
      </label>
    </div>
    <div>
      <label>
        Description:
        <input type="text" v-model="order.description">
      </label>
    </div>
    <div>
      <label>
        Date:
        <input type="text" v-model="order.createdDate">
      </label>
    </div>
    <div class="boxBtn">
      <button @click="saveOrder">Save</button>
      <button @click="close">Cancel</button>
    </div>
    <p>{{order.name}}</p>
  </dialog>
</template>

<script>
import ordersListService from "./ordersListService";

export default {
  name: "dialogEditOrder",
  data: function() {
    return {
      order: {},
      oldId: String
    };
  },

  created() {
    ordersListService.$on("editOrder", this.editOrder);
  },

  methods: {
    close() {
      this.$emit("closeDialogEdit");
      this.clearFields();
    },

    editOrder(editedOrder) {
      // Object.assign(this.order, editedOrder); //it is not works
      console.log("assign " + this.order.name);
      this.order = editedOrder;                 //it works
      this.oldId = editedOrder.id;
    },

    saveOrder() {
      ordersListService.saveOrder(this.order, this.oldId);
      this.close();
    },

    clearFields() {
      this.order.id = "";
      this.order.name = "";
      this.order.description = "";
      this.order.createdDate = "";
    }
  }
};
</script>
