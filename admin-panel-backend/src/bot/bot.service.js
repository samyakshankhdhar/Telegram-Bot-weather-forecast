"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotService = void 0;
const common_1 = require("@nestjs/common");
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const axios_1 = __importDefault(require("axios"));
let BotService = class BotService {
    async onModuleInit() {
        try {
            const token = "6977100313:AAHCPv_rcFBXylqWDKeoTGCv0CnP-_RqAoA";
            this.bot = new node_telegram_bot_api_1.default(token, { polling: true });
            this.bot.on('message', this.handleMessage.bind(this));
        }
        catch (error) {
            console.error('Failed to initialize Telegram bot:', error);
        }
    }
    async handleMessage(msg) {
        const chatId = msg.chat.id;
        const userInput = msg.text;
        try {
            const response = await axios_1.default.get(`https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=efcfa2dc99e6464322fb9470de1bcc42`);
            const data = response.data;
            const weather = data.weather[0].description;
            const temperature = data.main.temp - 273.15;
            const city = data.name;
            const humidity = data.main.humidity;
            const pressure = data.main.pressure;
            const windSpeed = data.wind.speed;
            const message = `The weather in ${city} is ${weather} with a temperature of ${temperature.toFixed(2)}°C. The humidity is ${humidity}%, the pressure is ${pressure}hPa, and the wind speed is ${windSpeed}m/s.`;
            this.bot.sendMessage(chatId, message);
        }
        catch (error) {
            this.bot.sendMessage(chatId, "City doesn't exist.");
        }
    }
};
exports.BotService = BotService;
exports.BotService = BotService = __decorate([
    (0, common_1.Injectable)()
], BotService);
//# sourceMappingURL=bot.service.js.map