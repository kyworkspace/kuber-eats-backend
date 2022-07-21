import { ArgsType, Field, InputType, OmitType } from '@nestjs/graphql';
import { Restaurants } from '../entities/restaurant.entity';

/*
    InputType : 말그대로 Input 타입을 정의한다. GraphQL의 Argument type 정의. 하나의 Object 선언
    ArgsType : 분리된 값들을 GraphQL argument로 전달해 줄 수 있도록 함. 하나의 Object에 담지 않음
    -> class 유효성 검사도 가능하다.
*/

@InputType()
//restaurant에서 id를 제외하고 작성함
export class CreateRestaurantDto extends OmitType(
  Restaurants,
  ['id'],
  InputType,
) {}
/*
 OmitType은 decorator를 바꾸도록 해줌
 상속받을 Restaurants는 ObjectType이기 때문에 바꿔준다.
 명시하지 않는 경우 부모의 Type을 상속받는데 여기는 InputType이라고 명시하였기 때문에 차이가 발생한다.
 다른 Type을 사용하는 경우 부모의 class를 변화시키고자 하는 타입을 명시 해주어야 한다.
*/
