import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // The URL of your frontend app
    credentials: true,
  });
  await app.listen(3001); // Ensure the backend listens on a different port from the frontend
}
bootstrap();
