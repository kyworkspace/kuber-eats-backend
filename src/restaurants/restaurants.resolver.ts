import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { UpdateRestaurantDto } from './dtos/update-restaurant.dto';
import { Restaurants } from './entities/restaurant.entity';
import { RestaurantService } from './restaurants.service';

@Resolver((of) => Restaurants) //argument가 필수는 아님
export class RestaurantsResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  //returns 라는 표현은 @Query의 리턴타입을 정의하기 위해 화살표함수를 위한 표현이다. ()=>type ...과 같은 뜻이다.
  //Args를 등록하여 필터 조회가 될 수 있도록 한다.
  @Query((returns) => [Restaurants])
  restaurants(): Promise<Restaurants[]> {
    return this.restaurantService.getAll();
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
  Input 타입을 사용할때는 @Args에 Argument name이 들어가야한다.
  Args 타입은 비워둔다.
  */
  async createRestaurant(
    @Args('input') createRestaurantDto: CreateRestaurantDto,
  ): Promise<boolean> {
    try {
      await this.restaurantService.createRestaurant(createRestaurantDto);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  @Mutation((returns) => Boolean)
  async updateRestaurant(
    @Args() updateRestaurantDto: UpdateRestaurantDto,
  ): Promise<boolean> {
    try {
      await this.restaurantService.updateRestaurant(updateRestaurantDto);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
