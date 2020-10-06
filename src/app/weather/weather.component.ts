import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-weather",
  templateUrl: "./weather.component.html",
  styleUrls: ["./weather.component.css"],
})
export class WeatherComponent implements OnInit {
  WeatherData: any;
  city: string;
  error = "";

  constructor() {}

  ngOnInit() {
    this.WeatherData = {
      main: {},
      isDay: null,
    };

    // console.log(this.WeatherData);
  }

  onClick() {
    this.getWeatherData();
  }

  getWeatherData() {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        this.city +
        "&appid=737913f87eff6434d5b4fdf46704bb98"
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        if (data.message) {
          this.error = data.message;
        } else {
          this.setWeatherData(data);
          this.error = "";
        }
      });
  }

  setWeatherData(data) {
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.WeatherData.sky = this.WeatherData.weather[0].description;
    this.WeatherData.isDay = currentDate.getTime() < sunsetTime.getTime();
    this.WeatherData.temp_celcius = (
      this.WeatherData.main.temp - 273.15
    ).toFixed(0);
    this.WeatherData.temp_min = (
      this.WeatherData.main.temp_min - 273.15
    ).toFixed(0);
    this.WeatherData.temp_max = (
      this.WeatherData.main.temp_max - 273.15
    ).toFixed(0);
    this.WeatherData.temp_feels_like = (
      this.WeatherData.main.feels_like - 273.15
    ).toFixed(0);
  }
}
