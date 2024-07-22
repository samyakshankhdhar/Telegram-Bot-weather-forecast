import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { UsersModule } from '../users/users.module'; // Import UsersModule


@Module({
  imports: [
    // TypeOrmModule.forFeature([/* Your Admin entities */]),
    UsersModule // Import UsersModule
  ],
  controllers: [AdminController]
})
export class AdminModule {}
