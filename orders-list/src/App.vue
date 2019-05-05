<template>
  <div id="app">
    <!-- <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="nav justify-content-center">
        <!-- <li class="nav-item">
          <router-link class="nav-link" to="/">Home</router-link>
    </li>-->
    <!-- <li class="nav-item">
          <router-link class="nav-link" to="/cars">Cars</router-link>
    </li>-->
    <!-- <router-link tag="li" class="nav-item" exact to="/" active-class="active">
          <a class="nav-link">Home</a>
        </router-link>
        <router-link tag="li" class="nav-item" exact to="/cars" active-class="active">
          <a class="nav-link">Cars</a>
        </router-link>

        <router-link tag="li" class="nav-item" exact to="/car/2" active-class="active">
          <a class="nav-link">Car 2</a>
        </router-link>
        <router-link tag="li" class="nav-item" exact to="/car/3" active-class="active">
          <a class="nav-link">Car 3</a>
        </router-link>
      </ul>
    </div>-->

    <!-- <router-view></router-view> -->
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
