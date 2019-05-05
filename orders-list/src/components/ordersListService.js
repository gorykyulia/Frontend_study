import Vue from "vue"

export default new Vue({
  data: {
    ordersData: [{
      "id": "1",
      "name": "dress123",
      "createdDate": "10.04.2019",
      "description": "This is summer dress"
    },
    {
      "id": "2",
      "name": "pants452",
      "createdDate": "11.04.2019",
      "description": "This is casual pants"
    },
    {
      "id": "3",
      "name": "skirt896",
      "createdDate": "16.04.2019",
      "description": "This is summer clother"
    }]
  },
  computed: {
    newId() {
      let arrOfNumbers = [];
      this.ordersData.forEach(order => arrOfNumbers.push(+order.id));

      for (let i = 1; ; i++) {
        if (!arrOfNumbers.includes(i)) {
          return `${i}`;
        }
      }
    },
    newDate() {
      let date = new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      if (day < 10) { day = `0${day} ` }
      if (month < 10) { month = `0${month} ` }

      return `${day}.${month}.${year}`;
    }
  },
  methods: {
    addOrder(name, desc) {
      if (name && desc) {
        const newOrder = {
          "id": this.newId,
          "name": name,
          "createdDate": this.newDate,
          "description": desc
        }
        this.ordersData.push(newOrder);
      }
    },

    deleteOrder(id) {
      for (let i = 0; i < this.ordersData.length; i++) {
        if (this.ordersData[i].id === id) {
          this.ordersData.splice(i, 1);
          return;
        }
      }
    },

    editOrder(id) {
      this.ordersData.forEach(order => {
        if (order.id === id) {
          this.$emit("editOrder", order);
        }
      })
    },

    saveOrder(newOrder, oldId) {
      if (oldId !== newOrder.id) {
        if (this.isIdInData(newOrder.id)) {
          console.log("There is an order with the same id");
          return;
        }
      }
      for (let i = 0; i < this.ordersData.length; i++) {
        if (this.ordersData[i].id === oldId) {
          this.ordersData.splice(i, 1, newOrder);
          return;
        }
      }
    },

    isIdInData(id) {
      let arrayOfId = [];
      this.ordersData.forEach(order => arrayOfId.push(order.id));
      if (arrayOfId.includes(id)) {
        return true;
      } else {
        return false;
      }
    }

  }
})