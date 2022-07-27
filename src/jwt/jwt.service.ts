import * as jwt from 'jsonwebtoken';
import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from './jwt.constants';
import { JwtModuleOptions } from './jwt.inerfaces';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions,
    private readonly configService: ConfigService,
  ) {
    //   constructor(@Inject('BANANAS') private readonly options: JwtModuleOptions) {
    //jwt 모듈에서 provide가 BANANS라는 이름으로, value가 JwtModuleOptions 타입의 데이터 이기 때문에 가능
  }
  //   sign(payload: object): string {
  //jwt 모듈을 재사용하기위해 들어오는 payload의 타입을 제한을 두지 않는 방향으로 갈 수 있지만 지금은 userId만 토큰화 할것이라서 타입을 특정함
  //privateKey의 경우 ConfigService에서 가져와도 되긴 하는데, 그냥 이런 방법이 있다 정도로 이해할것
  // type 오류가 발생하여 configService에서 가져오는 형태로 바꿈
  sign(userId: number): string {
    return jwt.sign({ userId }, this.configService.get('PRIVATE_KEY'));
  }
}
