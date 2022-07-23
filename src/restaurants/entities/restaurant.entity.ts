import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  IsBoolean,
  isBoolean,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { number } from 'joi';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//ObjectType ==> 자동으로 스키마를 빌드하기 위해 사용하는 그래프큐엘 데코레이터
//Entity ==> typeorm이 이걸 저장하게 해줌

//@InputType({isAbstract:true}) //==> Dto에서 InputType을 상속받고자 할때 사용할수 있는 옵션이다.
@ObjectType()
@Entity()
export class Restaurants {
  @PrimaryGeneratedColumn() //자동생성
  @Field((type) => Number)
  id: number;

  @Field((is) => String)
  @Column()
  @IsString()
  @Length(5)
  name: string;

  @Field((type) => Boolean, { defaultValue: true }) //graphql 스키마에서 default value가 true
  @Column({ default: true })
  @IsOptional() //해당 필드를 보내거나 보내지 않을수도 있음
  @IsBoolean()
  isVegan?: boolean;

  @Field((type) => String, { defaultValue: 'Somewhere In Korea' })
  @Column()
  address: string;
}
