import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { getEnvPath } from './config/helper/env.helper';
import { Restaurants } from './restaurants/entities/restaurant.entity';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { User } from './users/entities/user.entity';

const envFilePath: string = getEnvPath(`${__dirname}/config/envs`);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, //프로젝트 전역에서 접근여부
      envFilePath,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        SECRET_KEY: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      //연결 옵션
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT, //env에서 불러오는 내용은 기본적으로 String이기 때문에 캐스팅 해야한다.
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD, //localhost의 경우 password를 신경쓰지 않는다.
      database: process.env.DB_NAME,
      synchronize: process.env.NODE_ENV !== 'prod', // typeorm이 DB에 연결할때 데이터 베이스를 모듈이 현재 상태로 마이그레이션 한다는 의미 . 일단 dev일때만 마이그레이션 하도록함
      logging: false,
      entities: [User], //엔티티에서 만든것이 자동으로 DB에 꽂히도록 entity를 정의함
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // autoSchemaFile: join(process.cwd(), 'src/schema.gql'), //자동으로 스키마를 생성한다.
      autoSchemaFile: true, // 메모리에 스키마를 등록한다.
    }),
    UsersModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
