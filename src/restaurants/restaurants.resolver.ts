import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { Restaurants } from './entities/restaurant.entity';

@Resolver((of) => Restaurants) //argument가 필수는 아님
export class RestaurantsResolver {
  //returns 라는 표현은 @Query의 리턴타입을 정의하기 위해 화살표함수를 위한 표현이다. ()=>type ...과 같은 뜻이다.
  @Query((returns) => [Restaurants])
  restaurants(@Args('veganOnly') veganOnly: boolean): Restaurants[] {
    //Args를 등록하여 필터 조회가 될 수 있도록 한다.
    return [];
  }
  @Mutation((returns) => Boolean)

  /*
  createRestaurant(
    @Args('name') name: string,
    @Args('isVegan') isVegan: boolean,
    @Args('address') address: string,
    @Args('ownerName') ownerName: string,
  ): boolean {
    return true;
  }
  위와 같이 다 적을 수 있지만, InputType을 만들어서 넣을 수 있다.


  */
  createRestaurant(@Args() createRestaurantDto: CreateRestaurantDto): boolean {
    console.log(createRestaurantDto);
    return true;
  }
}
