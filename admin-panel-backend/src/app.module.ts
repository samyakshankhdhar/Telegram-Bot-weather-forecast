import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
// import { AuthModule } from './auth/auth.module';
// import { AdminModule } from './admin/admin.module';

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
    // AuthModule,
    // AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
