import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { RestaurantsModule } from './restaurants/restaurants.module';

console.log('DB_HOST', process.env.DB_HOST);
console.log('DB_PORT', process.env.DB_PORT);
console.log('DB_USERNAME', process.env.DB_USERNAME);
console.log('DB_PASSWORD', process.env.DB_PASSWORD);
console.log('DB_NAME', process.env.DB_NAME);
console.log('NODE_ENV', process.env.NODE_ENV);
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, //프로젝트 전역에서 접근여부
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test', //package.json에서 start:dev를 수정함
      ignoreEnvFile: process.env.NODE_ENV === 'prod', //서버에 deploy할때 환경변수 파일을 사용하지 않음
    }),
    TypeOrmModule.forRoot({
      //연결 옵션
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT, //env에서 불러오는 내용은 기본적으로 String이기 때문에 캐스팅 해야한다.
      username: process.env.DB_USERNAME,
      password: `${process.env.DB_PASSWORD}`, //localhost의 경우 password를 신경쓰지 않는다.
      database: process.env.DB_NAME,
      synchronize: true, // typeorm이 DB에 연결할때 데이터 베이스를 모듈이 현재 상태로 마이그레이션 한다는 의미
      logging: false,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // autoSchemaFile: join(process.cwd(), 'src/schema.gql'), //자동으로 스키마를 생성한다.
      autoSchemaFile: true, // 메모리에 스키마를 등록한다.
    }),
    RestaurantsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
