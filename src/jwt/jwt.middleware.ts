//token 발급 받은 것을 next()로 넘겨서 처리.

import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { JwtService } from './jwt.service';

//repository, class , dependancy Injection을 사용할때는 class 형 컴포넌트로 작성해야한다.
@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService, //userModule에서 exports 되고 있는지 찾을것
  ) {}

  //NestMiddleware는 use를 구현해야함
  async use(req: Request, res: Response, next: NextFunction) {
    //express랑 같은 느낌이다.
    if ('x-jwt' in req.headers) {
      const token = req.headers['x-jwt']; //token타입이 string | string[] 이기 때문에 verify 단계에서 string으로 전환
      //토큰에 있는 아이디를 추출
      try {
        const decoded = this.jwtService.verify(token.toString());
        if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
          const user = await this.userService.findById(decoded['id']);
          //미들웨어에서 처리된 유저 정보가 request에 담김
          req['user'] = user;
        }
      } catch (error) {}
    }
    next();
  }
}
