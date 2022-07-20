import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsString, Length } from 'class-validator';

/*
    InputType : 말그대로 Input 타입을 정의한다. GraphQL의 Argument type 정의. 하나의 Object 선언
    ArgsType : 분리된 값들을 GraphQL argument로 전달해 줄 수 있도록 함. 하나의 Object에 담지 않음
    -> class 유효성 검사도 가능하다.
*/

@ArgsType()
export class CreateRestaurantDto {
  @Field((type) => String)
  @IsString() //class validator
  @Length(5, 10) //class validator
  name: string;

  @Field((type) => Boolean)
  @IsBoolean()
  isVegan: boolean;

  @Field((type) => String)
  @IsString()
  address: string;

  @Field((type) => String)
  @IsString()
  ownerName: string;

  @Field((type) => String)
  @IsString()
  categoryName: string;
}
