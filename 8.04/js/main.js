"use strict"

const numberOfDays = 14;
const url = "https://api.exchangeratesapi.io/";
const array_of_dates = getDays(numberOfDays);

function getDays(numberOfDays) {
  const now = new Date();
  let i = 0, length = numberOfDays;
  let days = [];

  do {
    if (now.getDay() !== 0 && now.getDay() != 6) {
      days[i] = getFormatDate(now);
      now.setDate(now.getDate() - 1);
      i++;
    } else {
      now.setDate(now.getDate() - 1);
      continue;
    }
  } while (i < length)
  return days.reverse();
}

function getFormatDate(date) {
  return date.toISOString().slice(0, 10);
}

//////////    Config for charts    ///////////////

const labels = [];
const datasets = [];
const chartOptions = {
  legend: {
    display: true,
    position: 'top',
    labels: {
      fontColor: 'black',
      fill: false
    }
  }
}

///////////////     Requests      //////////////////

let arrayOfRequests = array_of_dates.map(date => {
  let path = url + `${date}`;
  return fetch(path);
});

Promise.all(arrayOfRequests)
  .then(results => {
    return results.map(item => {
      return item.json();
    });
  })
  .then(response => {
    let length = array_of_dates.length;
    let receivedAnswers = [];
    for (let i = 0; i < length; i++) {
      response[i]
        .then(res => {
          receivedAnswers[i] = res;
        })
        .catch(err => console.log(`Error: ${err}`));
    }
    return receivedAnswers;
  })
  .then(allAnswers => createCharts(allAnswers))
  .catch(error => {
    console.log(`Error: ${error}`);
  });

///////////   Create and configurate charts    //////////////////////

function createCharts(dateFromApi) {
  array_of_dates.forEach((item) => labels.push(formatDate(Date.parse(item))));
  writeAllAnswers(dateFromApi);

  let i,
    number = dateFromApi.length,
    chartsBox = document.getElementById('charts'),
    chart, option;

  for (i = 1; i <= number; i++) {
    chart = document.createElement('canvas');
    chart.setAttribute('id', `chart${i}`);
    chart.style.width = "300px";
    chart.style.height = "100px";
    chartsBox.appendChild(chart);
    option = {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          fill: false,
          borderColor: getRandomColor(),
          label: datasets[i - 1].label,
          data: datasets[i - 1].data
        }]
      },
      options: chartOptions
    };
    new Chart(`chart${i}`, option);
  }
}

function writeAllAnswers(receivedAnswers) {
  let i, length = receivedAnswers.length;

  let keys = Object.keys(receivedAnswers[0].rates)
  setLabelsInChart(keys);


  for (i = 0; i < length; i++) {
    if (receivedAnswers[i].date === array_of_dates[i]) {
      writeOneAnswer(receivedAnswers[i], true);
    } else {
      writeOneAnswer(receivedAnswers[i], false);
    }
  }
}

function writeOneAnswer(httpData, isDataCorrect) {

  datasets.forEach((item) => {
    if (isDataCorrect) {
      item.data.push(httpData.rates[item.label]);
    } else {
      item.data.push(0);
    }

  });

}

function setLabelsInChart(names) {
  let i, length = names.length;
  for (i = 0; i < length; i++) {
    datasets.push({
      label: names[i],
      data: []
    })
  }
}

function formatDate(miliseconds) {
  let date = new Date(miliseconds);
  let day = date.getDate();
  let month = date.getMonth() + 1;

  if (day < 10) { day = `0${day}` }
  if (month < 10) { month = `0${month}` }

  return `${day}.${month}`;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}





