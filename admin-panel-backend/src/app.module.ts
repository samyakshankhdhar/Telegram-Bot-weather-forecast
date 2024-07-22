import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { BotService } from './bot/bot.service';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Cows@123',
      database: 'tb_admin_panel',
      entities: [User],
      synchronize: true,
    }),
    UsersModule,
    AdminModule
  ],
  providers: [BotService],
})
export class AppModule {}
