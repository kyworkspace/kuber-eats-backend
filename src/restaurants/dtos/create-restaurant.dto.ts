import { ArgsType, Field, InputType } from '@nestjs/graphql';

/*
    InputType : 말그대로 Input 타입을 정의한다. GraphQL의 Argument type 정의. 하나의 Object 선언
    ArgsType : 분리된 값들을 GraphQL argument로 전달해 줄 수 있도록 함. 하나의 Object에 담지 않음
    -> class 유효성 검사도 가능하다.
*/

@ArgsType()
export class CreateRestaurantDto {
  @Field((type) => String) name: string;
  @Field((type) => Boolean) isVegan: boolean;
  @Field((type) => String) address: string;
  @Field((type) => String) ownerName: string;
}
