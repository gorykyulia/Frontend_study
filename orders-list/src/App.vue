<template>
  <div id="app">
    <!-- <Validation></Validation> -->
    <button class="addBtn" @click="openDialogAdd">Add order</button>
    <ordersTable @editOrder="editOrder"></ordersTable>
    <dialogAddOrder :open="dialogAddEnabled" @closeDialog="closeDialogAdd"></dialogAddOrder>
    <dialogEditOrder :open="dialogEditEnabled" @closeDialogEdit="closeDialogEdit"></dialogEditOrder>
  </div>
</template>

<script>
import ordersListService from "./components/ordersListService";
import ordersTable from "./components/ordersTable.vue";
import dialogAddOrder from "./components/dialogAddOrder.vue";
import dialogEditOrder from "./components/dialogEditOrder.vue";
import Validation from "./components/Validation.vue";

export default {
  name: "app",
  components: {
    ordersTable,
    dialogAddOrder,
    dialogEditOrder,
    Validation
  },
  data: function() {
    return {
      dialogAddEnabled: false,
      dialogEditEnabled: false
    };
  },

  created() {
    ordersListService.$on("editOrder", this.openDialogEdit);
  },

  methods: {
    editOrder(id) {
      this.editedOrderId = id;
      this.dialogEditEnabled = true;
    },
    openDialogAdd() {
      this.dialogAddEnabled = true;
    },
    openDialogEdit() {
      this.dialogEditEnabled = true;
    },
    closeDialogAdd() {
      this.dialogAddEnabled = false;
    },
    closeDialogEdit() {
      this.dialogEditEnabled = false;
    }
  }
};
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.addBtn {
  padding: 5px 15px;
}
</style>
