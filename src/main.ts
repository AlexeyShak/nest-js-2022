import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'body-parser';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  if(process.env.USE_FASTIFY === 'true'){
    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter()
    );
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(process.env.PORT);
  }else{

    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.use(json());
    app.use(urlencoded());
    await app.listen(process.env.PORT);
  }
}
bootstrap();
