<template>
  <div id="orders">
    <table class="table">
      <thead>
        <tr>
          <th v-for="name in columnsName" :key="name">{{ name }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in ordersData" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.name }}</td>
          <td>{{ order.createdDate }}</td>
          <td>{{ order.description }}</td>
          <td>
            <button @click="editOrder(order.id)">Edit</button>
          </td>
          <td>
            <button @click="deleteOrder(order.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ordersListService from "./ordersListService";
export default {
  name: "ordersTable",
  components: {},
  data: function() {
    return {
      columnsName: [
        "Id",
        "Name",
        "Created date",
        "Description",
        "Edit",
        "Delete"
      ],
      ordersData: []
    };
  },
  created() {
    this.ordersData = ordersListService.ordersData;
  },

  methods: {
    editOrder(id) {
      ordersListService.editOrder(id);
    },

    deleteOrder(id) {
      ordersListService.deleteOrder(id);
    }
  }
};
</script>

<style scoped>
#orders {
  width: 70%;
  margin: auto;
}

.table {
  margin-top: 10px;
  width: 100%;
  border: 1px solid black;
  border-collapse: collapse;
}

thead th:nth-child(1) {
  width: 10%;
}

thead th:nth-child(2) {
  width: 15%;
}

thead th:nth-child(3) {
  width: 20%;
}

thead th:nth-child(4) {
  width: 35%;
}
thead th:nth-child(5) {
  width: 10%;
}
thead th:nth-child(6) {
  width: 10%;
}

td,
th {
  border: solid 1px #ccc;
  padding: 5px 10px;
}
</style>