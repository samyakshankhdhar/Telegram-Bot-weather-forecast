import { OnModuleInit } from '@nestjs/common';
export declare class BotService implements OnModuleInit {
    private bot;
    onModuleInit(): Promise<void>;
    private handleMessage;
}
