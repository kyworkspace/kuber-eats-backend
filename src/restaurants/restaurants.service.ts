import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
}
