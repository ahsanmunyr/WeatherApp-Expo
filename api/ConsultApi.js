export default async function getConsultApi() {
  const axios = require("axios");


  let date = new Date();
  const Hours =
    date.getHours() + ":" + String(date.getMinutes()).padStart(2, "0");

  var result = [];
  const latitude =  24.8322342;
  const longitude =  67.1298671;
  const key = "8d37017fe5f84a9fa3e121428240201";

  await axios
    .get(
      `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${latitude},${longitude}&days=1&api=yes`
    )
    .then(async (res) => {
      const data = await res.data;
      console.log(data, "data")
      const ConditionCode = data.current.condition.icon;

      let manha =
        (data.forecast.forecastday[0].hour[6].temp_c +
          data.forecast.forecastday[0].hour[7].temp_c +
          data.forecast.forecastday[0].hour[8].temp_c +
          data.forecast.forecastday[0].hour[9].temp_c +
          data.forecast.forecastday[0].hour[10].temp_c +
          data.forecast.forecastday[0].hour[11].temp_c +
          data.forecast.forecastday[0].hour[12].temp_c) /
        7;

      let tarde =
        (await (data.forecast.forecastday[0].hour[12].temp_c +
          data.forecast.forecastday[0].hour[13].temp_c +
          data.forecast.forecastday[0].hour[14].temp_c +
          data.forecast.forecastday[0].hour[15].temp_c +
          data.forecast.forecastday[0].hour[16].temp_c +
          data.forecast.forecastday[0].hour[17].temp_c +
          data.forecast.forecastday[0].hour[18].temp_c)) / 7;

      let noite =
        (data.forecast.forecastday[0].hour[19].temp_c +
          data.forecast.forecastday[0].hour[19].temp_c +
          data.forecast.forecastday[0].hour[20].temp_c +
          data.forecast.forecastday[0].hour[21].temp_c +
          data.forecast.forecastday[0].hour[22].temp_c +
          data.forecast.forecastday[0].hour[23].temp_c +
          data.forecast.forecastday[0].hour[0].temp_c) /
        7;

      const City = 'Karachi';
      const Country = "PK";
      const Temperature = res.data.current.temp_c;
      const TemperatureMorning = Math.floor(manha);
      const TemperatureEvening = Math.floor(tarde);
      const TemperatureNight = Math.floor(noite);
      const TemperatureMin = data.forecast.forecastday[0].day.mintemp_c;
      const TemperatureMax = data.forecast.forecastday[0].day.maxtemp_c;
      const Rain = data.forecast.forecastday[0].day.daily_chance_of_rain;
      const Humidity = data.current.humidity;
      const WeatherIcon = ConditionCode;

      // Country, City, Hours, Temperature, TemperatureMin, TemperatureMax, TemperatureMorning, TemperatureEvening, TemperatureNight, Rain, Wind
      result = [
        Country,
        City,
        Hours,
        Temperature,
        TemperatureMin,
        TemperatureMax,
        TemperatureMorning,
        TemperatureEvening,
        TemperatureNight,
        Rain,
        Humidity,
        WeatherIcon,
      ];
    })
    .catch((err) => {
      console.log(err, "ERROR");
    });

  return result;
}
