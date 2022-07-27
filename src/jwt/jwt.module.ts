import { DynamicModule, Global, Module } from '@nestjs/common';
import { JwtService } from './jwt.service';

@Module({})
@Global() //Global Module로 사용한다는 뜻
export class JwtModule {
  //forRoot를 직접 선언 후 적용
  static forRoot(): DynamicModule {
    //Dynamic 모듈은 또다른 모듈을 반환하는 모듈이다.
    return {
      module: JwtModule,
      exports: [JwtService], //JwtService 또한 export 한다.
      providers: [JwtService],
    };
  }
}
