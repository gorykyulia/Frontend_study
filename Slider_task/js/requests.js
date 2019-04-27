function getUsersData(arrayOfNames, url) {
  let arrayOfRequests = arrayOfNames.map(name => {
    let path = url + `${name}`;
    return fetch(path);
  });

  Promise.all(arrayOfRequests)
  .then(responses => {
    return responses.map(item => item.json());
  })
  .then(results => {
    let receivedAnswers = [];
    for (let i = 0, length = arrayOfNames.length; i < length; i++) {
      results[i]
        .then(res => {
          receivedAnswers[i] = res;
        })
    }
    return receivedAnswers;
  })
  .then(allAnswers => init(allAnswers))
  .catch(error => {
    console.log(`Error: ${error}`);
  });
}