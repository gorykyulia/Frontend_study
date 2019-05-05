import Vue from 'vue'

export default new Vue({
  data: {
    usersNames: ["dmitro", "yulia", "sam", "mike", "katya", "jane"],
    URL_GITHUB: "https://api.github.com/users/",
    usersData: []
  },
  created() {
    let arrayOfRequests = this.usersNames.map(name => {
      let path = this.URL_GITHUB + `${name}`;
      return fetch(path);
    });

    Promise.all(arrayOfRequests)
    .then(responses => responses.map(item => item.json()))
    .then(results => {
      let receivedAnswers = [];
      for (let i = 0, length = this.usersNames.length; i < length; i++) {
        results[i]
        .then(res => receivedAnswers[i] = res)
      }
      this.usersData = receivedAnswers;
      this.$emit('dataReceived', this.usersData);
    })
    .catch(error => {
      console.log(`Error: ${error}`);
    });
  }
});