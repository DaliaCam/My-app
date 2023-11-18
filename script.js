let timeUpdate =
  document.querySelector(
    "#time"
  );
let now = new Date();
let minutes =
  now.getMinutes(); // 0,1,2, 12
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let hours = now.getHours(); //1, 2, 3, 4
if (hours < 10) {
  hours = `0${hours}`;
}
let month = now.getMonth(); // 0, 1, 2
let year = now.getFullYear(); // 2021
let months = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];
let currentDate =
  now.getDate();
time.innerHTML = `${hours}:${minutes}`;
date.innerHTML = `${currentDate}/${months[month]}/${year}`;
console.log(month);
function showTemperature(
  response
) {
  document.querySelector(
    "#city"
  ).innerHTML =
    response.data.city;
  console.log(response.data);
  document.querySelector(
    "#humidity"
  ).innerHTML =
    response.data.temperature.humidity;
  document.querySelector(
    "#wind"
  ).innerHTML =
    response.data.wind.speed;
  document.querySelector(
    "#wheater-description"
  ).innerHTML =
    response.data.condition.description;
  let temperature =
    Math.round(
      response.data.main.temp
    );

  document.querySelector(
    "#temperature"
  ).innerHTML =
    response.data.temperature.current;
  let iconElement =
    document.querySelector(
      "#icon"
    );
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
}

function searchCity(city) {
  let apiKey =
    "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios
    .get(apiUrl)
    .then(showTemperature);
}

function searchPosition(
  position
) {
  let apiKey =
    "e150c305c02488c12758b495b131c7bd";
  let lat =
    position.coords.latitude;
  let lon =
    position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios
    .get(apiUrl)
    .then(showTemperature);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(
    searchPosition
  );
}

function handleSubmit(event) {
  event.preventDefault();
  let city =
    document.querySelector(
      "#city-input"
    ).value;
  searchCity(city);
}

let searchForm =
  document.querySelector(
    "#search-form"
  );
searchForm.addEventListener(
  "submit",
  handleSubmit
);
let positionButton =
  document.querySelector(
    "#position-button"
  );
positionButton.addEventListener(
  "click",
  getPosition
);
