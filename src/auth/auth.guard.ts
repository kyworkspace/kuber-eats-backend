import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

//req를 다음단계로 진행할지말지 정함
@Injectable()
export class AuthGuard implements CanActivate {
  /*
    CanActivate : 함수로서 true를 리턴하면 req를 진행하고 false의 경우 req를 멈추게 만듬

    "message": "Forbidden resource" 라는 error로 req 차단
    */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    /*
    context 는 HTTP로 되어있기 때문에 Graphql로 바꿔야 한다.
    */
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const user = gqlContext['user'];
    if (!user) {
      return false;
    }
    return true;
  }
}
