import { NestFactory } from '@nestjs/core';
import { InitOpenApi } from './configuration/OpenApi';
import { MainModule } from './modules/main/main.module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);

  InitOpenApi(app);

  await app.listen(parseInt(process.env.PORT) || 3001);
}
bootstrap();