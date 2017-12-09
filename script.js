window.onload = getCurrentLocation();

var position = document.getElementById("location");
var weatherConditions = document.getElementById("weather-conditions");
var pic = document.getElementById("pic");
var temperature = document.getElementById("temperature-current");
var wind = document.getElementById("wind");
var pressure = document.getElementById("pressure");
var humidity = document.getElementById("humidity");
var cityButtonsHolder = document.getElementById("city-buttons-holder");
var cities = [];
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
window.onload = function() {
  var lati = 0;
  var long = 0;

  var deathValley = {
    latitude: 36.548416,
    longitude: -116.9325408
  };

  var yakutsk = {
    latitude: 62.0355,
    longitude: 129.6755
  };

  var melbourne = {
    latitude: -37.814251,
    longitude: 144.963169
  };

  var toronto = {
    latitude: 43.4200,
    longitude: -79.4163000
  };

  navigator.geolocation.getCurrentPosition(function(position) {
    lati = position.coords.latitude;
    long = position.coords.longitude;

    $.getJSON(
      "https://fcc-weather-api.glitch.me/api/current?lat=" +
        lati	 +
        "&lon=" +
        long
    )
      .done(update)
      .fail(handleErr);
  });

  var cities = document.querySelectorAll(".cities");
  var i = 0,
    length = cities.length;
  for (i; i < length; i++) {
    cities[i].addEventListener("click", function(lati, long) {
      if (this.innerHTML === "Death Valley") {
        lati = deathValley.latitude;
        long = deathValley.longitude;
        $.getJSON(
          "https://fcc-weather-api.glitch.me/api/current?lat=" +
            lati +
            "&lon=" +
            long
        )
          .done(update)
          .fail(handleErr);
      } else if (this.innerHTML === "Yakutsk") {
        lati = yakutsk.latitude;
        long = yakutsk.longitude;
        $.getJSON(
          "https://fcc-weather-api.glitch.me/api/current?lat=" +
            lati +
            "&lon=" +
            long
        )
          .done(update)
          .fail(handleErr);
      } else if (this.innerHTML === "Your current location") {
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
      } else if (this.innerHTML === "Melbourne") {
        lati = melbourne.latitude;
        long = melbourne.longitude;
        $.getJSON(
          "https://fcc-weather-api.glitch.me/api/current?lat=" +
            lati +
            "&lon=" +
            long
        )
          .done(update)
          .fail(handleErr);
      } else if (this.innerHTML === "Toronto") {
        lati = toronto.latitude;
        long = toronto.longitude;
        $.getJSON(
          "https://fcc-weather-api.glitch.me/api/current?lat=" +
            lati +
            "&lon=" +
            long
        )
          .done(update)
          .fail(handleErr);
      }
    });
  }
};

var position = document.getElementById("location");
var weatherConditions = document.getElementById("weather-conditions");
var pic = document.getElementById("pic");
var temperature = document.getElementById("temperature-current");
var wind = document.getElementById("wind");
var pressure = document.getElementById("pressure");
var humidity = document.getElementById("humidity");

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

  function celToFar(x) {
    var tempInFar = x * 9 / 5 + 32;
    return tempInFar;
  }

  var tempCel = "Temperature: " + temp + " °C";
  var tempFar = "Temperature: " + celToFar(temp) + " °F";

  temperature.innerHTML = tempCel;

  document.getElementById("to-celsius").addEventListener("click", function() {
    temperature.innerHTML = tempCel;
  });

  document.getElementById("to-farenheit").addEventListener("click", function() {
    temperature.innerHTML = tempFar;
  });

  wind.innerHTML = "Wind: " + winds + " m/s";
  pressure.innerHTML = "Pressure: " + pressures + "mbar";
  humidity.innerHTML = "Humidity: " + humiditis + "%";
}

function handleErr(jqxhr, textStatus, err) {
  console.log("Request Failed: " + textStatus + ", " + err);
}
