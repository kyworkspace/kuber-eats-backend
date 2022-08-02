import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const AuthUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    //req에서 들어온 컨텍스트에서 user 정보를 가져옴
    /*
    UserGuard에서 확인한 것은 user가 있냐없냐에 따라 진행시킨것 뿐이고
    실제로 회원정보를 리턴하는 부분이 여기다.
    */
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const user = gqlContext['user'];
    return user;
  },
);
