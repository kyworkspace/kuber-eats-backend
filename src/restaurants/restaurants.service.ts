import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { UpdateRestaurantDto } from './dtos/update-restaurant.dto';
import { Restaurants } from './entities/restaurant.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurants)
    private readonly restaurants: Repository<Restaurants>,
  ) {}

  getAll(): Promise<Restaurants[]> {
    //find는 async 메서드여서 Promise를 붙여줘야함
    return this.restaurants.find();
  }

  createRestaurant(
    createRestaurantDto: CreateRestaurantDto,
  ): Promise<Restaurants> {
    /*
    const newRestaurant = new Restaurants();
    newRestaurant.name = createRestaurantDto.name;
    일일이 하면 귀찮기 때문에 DTO에서 Create한다.
    */

    //인스턴스를 생성
    const newRestaurant = this.restaurants.create(createRestaurantDto);
    //save는 promise 타입임
    return this.restaurants.save(newRestaurant);
  }

  updateRestaurant({ id, data }: UpdateRestaurantDto) {
    /*
    업데이트 할때는 처번째 args는 search criteria가 들어간다. 여기서는 id
    update()는 DB에 해당 entity가 있는지 확인하지 않는다.
    */
    return this.restaurants.update(id, { ...data });
  }
}
