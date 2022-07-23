import { ArgsType, Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateRestaurantDto } from './create-restaurant.dto';

@InputType()
class UpdateRestaurantInputType extends PartialType(CreateRestaurantDto) {}

/*
    1. 어떤걸 업데이트 해야하는지 확인해야 하기 때문에 ID가 argument로 들어가야함
    2. updateRes Input 타입을 상속? 해와서 Dto를 재구성함
*/
//
@ArgsType()
export class UpdateRestaurantDto {
  @Field((type) => Number)
  id: number;

  @Field((type) => UpdateRestaurantInputType)
  data: UpdateRestaurantInputType;
}
