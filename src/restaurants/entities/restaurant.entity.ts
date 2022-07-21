import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { isBoolean, IsString, Length } from 'class-validator';
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
