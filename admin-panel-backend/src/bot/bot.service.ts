import { Injectable, OnModuleInit } from '@nestjs/common';
import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';

@Injectable()
export class BotService implements OnModuleInit {
  private bot: TelegramBot;

  async onModuleInit() {
    try {
        const token = "6977100313:AAHCPv_rcFBXylqWDKeoTGCv0CnP-_RqAoA";
        this.bot = new TelegramBot(token, { polling: true });
        this.bot.on('message', this.handleMessage.bind(this));
    } catch (error) {
        console.error('Failed to initialize Telegram bot:', error);
    }
  }

  private async handleMessage(msg: { chat: { id: any }; text: any }) {
    const chatId = msg.chat.id;
    const userInput = msg.text;

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=efcfa2dc99e6464322fb9470de1bcc42`
      );
      const data = response.data;
      const weather = data.weather[0].description;
      const temperature = data.main.temp - 273.15;
      const city = data.name;
      const humidity = data.main.humidity;
      const pressure = data.main.pressure;
      const windSpeed = data.wind.speed;
      const message = `The weather in ${city} is ${weather} with a temperature of ${temperature.toFixed(2)}°C. The humidity is ${humidity}%, the pressure is ${pressure}hPa, and the wind speed is ${windSpeed}m/s.`;

      this.bot.sendMessage(chatId, message);
    } catch (error) {
      this.bot.sendMessage(chatId, "City doesn't exist.");
    }
  }
}
