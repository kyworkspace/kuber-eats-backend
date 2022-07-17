import { Args, Query, Resolver } from '@nestjs/graphql';
import { Restaurants } from './entities/restaurant.entity';

@Resolver((of) => Restaurants) //argument가 필수는 아님
export class RestaurantsResolver {
  //returns 라는 표현은 @Query의 리턴타입을 정의하기 위해 화살표함수를 위한 표현이다. ()=>type ...과 같은 뜻이다.
  @Query((returns) => [Restaurants])
  restaurants(@Args('veganOnly') veganOnly: boolean): Restaurants[] {
    //Args를 등록하여 Mutation이 될수 있도록 한다.
    return [];
  }
}
