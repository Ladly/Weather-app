// athens (long: 23.716 lat: 37.979)
// cologne(long: 6.953 lat:50.935)

window.onload = getCurrentLocation();

var position = document.getElementById("location");

var weatherConditions = document.getElementById("weather-conditions");
var pic = document.getElementById("pic");
var temperature = document.getElementById("temperature-current");
var wind = document.getElementById("wind");
var pressure = document.getElementById("pressure");
var humidity = document.getElementById("humidity");
var cityButtonsHolder = document.getElementById("city-buttons-holder");
var customCityButtonHolder = document.getElementById('custom-button-holder')
var cities = [];
var submitSingleCityButton = document.getElementById('submit-single-city-form');
var currentLocationButton = document.createElement("button");
currentLocationButton.setAttribute("class", "btn btn-primary");
currentLocationButton.innerHTML = "My current location";
currentLocationButton.addEventListener("click", function() {
  getCurrentLocation();
});

var deathValley = new City(1, "Death Valley", 36.548416, -116.9325408);
var yakutsk = new City(2, "Yakutsk", 62.0355, 129.6755);
var melburne = new City(3, "Melbourne", -37.814251, 144.963169);
var toronto = new City(4, "Toronto", 43.42, -79.4163);

cities.push(deathValley, yakutsk, melburne, toronto);

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(function(position) {
    lati = position.coords.latitude;
    long = position.coords.longitude;
    $.getJSON(
      "https://fcc-weather-api.glitch.me/api/current?lat=" +
        lati +
        "&lon=" +
        long
    )
      .done(update)
      .fail(handleErr);
  });
}

function update(response) {
  var loca = JSON.stringify(response.name);
  var weather = JSON.stringify(response.weather[0]["icon"]);
  var country = JSON.stringify(response.sys.country);
  country = JSON.parse(country);
  if (country === "RS") {
    country = "Serbia";
  }
  var temp = JSON.stringify(response.main.temp);
  temp = JSON.parse(temp);
  if (temp >= 30) {
    document.body.style.backgroundImage =
      'url("https://image.ibb.co/dWXVuv/desert_1270345_1920.jpg")';
  } else if (temp > 25 && temp < 30) {
    document.body.style.backgroundImage =
      'url("https://image.ibb.co/cwMbma/seaside.jpg")';
  } else if (temp > 15 && temp <= 25) {
    document.body.style.backgroundImage =
      'url("https://image.ibb.co/dBukev/forest.jpg")';
  } else if (temp > 0 && temp <= 15) {
    document.body.style.backgroundImage =
      'url("https://image.ibb.co/dBukev/forest.jpg")';
  } else if (temp < 0) {
    document.body.style.backgroundImage =
      'url("https://image.ibb.co/dBukev/forest.jpg")';
  } else {
    document.body.style.backgroundColor = "red";
  }
  var winds = JSON.stringify(response.wind.speed);
  var pressures = JSON.stringify(response.main.pressure);
  var humiditis = JSON.stringify(response.main.humidity);
  position.innerHTML = JSON.parse(loca) + ", " + country;
  pic.src = JSON.parse(weather);
  temperature.innerHTML = "Temperature: " + temp + " °C";

  var celsiusToFarenheit = document.getElementById("switch");
  celsiusToFarenheit.setAttribute("class", "btn btn-primary switch");
  celsiusToFarenheit.innerHTML = "To farenheit";
  celsiusToFarenheit.addEventListener("click", function() {
    if (this.innerHTML === "To farenheit") {
      celToFar(temperature, temp);
      this.innerHTML = "To celsius";
    } else if (this.innerHTML === "To celsius") {
      temperature.innerHTML = "Temperature: " + temp + " °C";
      this.innerHTML = "To farenheit";
    }
  });

  wind.innerHTML = "Wind: " + winds + " m/s";
  pressure.innerHTML = "Pressure: " + pressures + "mbar";
  humidity.innerHTML = "Humidity: " + humiditis + "%";
}

function handleErr(jqxhr, textStatus, err) {
  console.log("Request Failed: " + textStatus + ", " + err);
}

function City(id, name, latitude, longitude) {
  (this.id = id), (this.name = name), (this.longitude = longitude), (this.latitude = latitude);
  this.getWeatherInfo = function() {
    $.getJSON(
      "https://fcc-weather-api.glitch.me/api/current?lat=" +
        this.latitude +
        "&lon=" +
        this.longitude
    )
      .done(update)
      .fail(handleErr);
  };
}

function displayWeather(arr, arg) {
  arr[arg].getWeatherInfo();
}

function celToFar(el, arg) {
  var tempInFar = arg * 9 / 5 + 32;
  el.innerHTML = "Temperature: " + tempInFar + " °F";
}

for (var i = 0; i < cities.length; i++) {
  var cityButton = document.createElement("button");
  cityButton.setAttribute("class", "btn btn-primary city-button");
  cityButton.setAttribute("id", i);
  cityButton.innerHTML = cities[i].name;
  cityButton.addEventListener("click", function() {
    whichCity = this.id;
    displayWeather(cities, whichCity);
  });
  cityButtonsHolder.append(cityButton, currentLocationButton);
}


submitSingleCityButton.addEventListener('click', function(){
  var pickedLongitude = document.getElementById('pickedLongitude').value
  var pickedLatitude = document.getElementById('pickedLatitude').value
        $.getJSON(
      "https://fcc-weather-api.glitch.me/api/current?lat=" +
        pickedLatitude +
        "&lon=" +
        pickedLongitude
    )
      .done(update)
      .fail(handleErr);
})

var submitLocalCity = document.getElementById('add-local-city')
  submitLocalCity.addEventListener('click', function(){                     // function to add city you prefer to monitor temerature
  var localCityCoordinates = {}
  var localCity =  document.getElementById('localCityName').value
  var localCityLongitude = document.getElementById('localPickedLongitude').value
  var localCityLatitude = document.getElementById('localPickedLatitude').value
  localCityCoordinates.longitude = localCityLongitude
  localCityCoordinates.latitude = localCityLatitude
  localStorage.setItem(localCity, JSON.stringify(localCityCoordinates));

})

 for(var city in localStorage) {
   var customCityButton = document.createElement('button');
   customCityButton.setAttribute('class', 'btn btn-primary')
   customCityButton.innerHTML = city
   customCityButtonHolder.append(customCityButton)
   customCityButton.addEventListener('click', function(){
     var leftSide = this.innerHTML
     var values = JSON.parse(localStorage[leftSide])
      $.getJSON(
      "https://fcc-weather-api.glitch.me/api/current?lat=" +
        values.latitude +
        "&lon=" +
        values.longitude
    )
      .done(update)
      .fail(handleErr);
     })
 }

var clearButton = document.getElementById('clear-local-storage')
clearButton.addEventListener('click', function(){
  localStorage.clear()
})
