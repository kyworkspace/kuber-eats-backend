import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from './jwt.constants';
import { JwtModuleOptions } from './jwt.inerfaces';

@Injectable()
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions,
  ) {
    //   constructor(@Inject('BANANAS') private readonly options: JwtModuleOptions) {
    //jwt 모듈에서 provide가 BANANS라는 이름으로, value가 JwtModuleOptions 타입의 데이터 이기 때문에 가능
  }
  hello() {
    console.log('hello');
  }
}
