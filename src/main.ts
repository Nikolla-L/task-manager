import { RequestMethod } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { InitOpenApi } from './configuration/OpenApi';
import { MainModule } from './modules/main/main.module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  
  app.setGlobalPrefix('api', {
    exclude: [{ path: '', method: RequestMethod.GET }]
  });

  const options = {
    origin: "*",
    methods: "GET,PUT,POST,DELETE",
  };
  app.enableCors(options);

  
  InitOpenApi(app);

  await app.listen(parseInt(process.env.PORT) || 3001);
}
bootstrap();