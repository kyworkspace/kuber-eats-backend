import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtMiddleware } from './jwt/jwt.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // app.use(jwtMiddleware); //미들웨어를 main에서 사용하는 방법 app.use를 사용할때는 함수형만 가능하다.
  await app.listen(3000);
}
bootstrap();
