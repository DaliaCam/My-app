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
    response.data.name;
  let temperature =
    Math.round(
      response.data.main.temp
    );
  let temperatureText =
    document.querySelector(
      "#temperature"
    );
  temperatureText.innerHTML =
    temperature;
}

function searchCity(city) {
  let apiKey =
    "e150c305c02488c12758b495b131c7bd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
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
