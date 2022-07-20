import { Field, ObjectType } from '@nestjs/graphql';
import { number } from 'joi';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//ObjectType ==> 자동으로 스키마를 빌드하기 위해 사용하는 그래프큐엘 데코레이터
//Entity ==> typeorm이 이걸 저장하게 해줌
@ObjectType()
@Entity()
export class Restaurants {
  @PrimaryGeneratedColumn() //자동생성
  @Field((type) => Number)
  id: number;

  @Field((is) => String)
  @Column()
  name: string;

  @Field((type) => Boolean, { nullable: true })
  @Column()
  isVegan?: boolean;

  @Field((type) => String)
  @Column()
  address: string;

  @Field((type) => String)
  @Column()
  ownerName: string;

  @Field((type) => String)
  @Column()
  categoryName: string;
}
