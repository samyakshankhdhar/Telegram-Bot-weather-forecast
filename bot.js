require('dotenv').config(); // To use environment variables
const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
const express = require('express');
const app = express();

// Set up server
app.get('/', (req, res) => {
  res.send('Hello World!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Use environment variables for sensitive data
const token = process.env.TELEGRAM_BOT_TOKEN;
const weatherApiKey = process.env.WEATHER_API_KEY;

if (!token || !weatherApiKey) {
  console.error("Missing necessary environment variables");
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const userInput = msg.text;

  try {
    const weatherData = await getWeatherData(userInput);
    const message = formatWeatherMessage(weatherData);
    bot.sendMessage(chatId, message);
  } catch (error) {
    console.error(error);
    bot.sendMessage(chatId, "City doesn't exist or there was an error retrieving the weather.");
  }
});

async function getWeatherData(city) {
  const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}`);
  return response.data;
}

function formatWeatherMessage(data) {
  const weather = data.weather[0].description;
  const temperature = data.main.temp - 273.15;
  const city = data.name;
  const humidity = data.main.humidity;
  const pressure = data.main.pressure;
  const windSpeed = data.wind.speed;
  return `The weather in ${city} is ${weather} with a temperature of ${temperature.toFixed(2)}°C. The humidity is ${humidity}%, the pressure is ${pressure}hPa, and the wind speed is ${windSpeed}m/s.`;
}
