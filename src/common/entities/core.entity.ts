import { Field } from '@nestjs/graphql';
import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CoreEntity {
  @PrimaryGeneratedColumn()
  @Field((type) => String)
  id: number;
  /*
   CreateDataColumn : entity를 만들었을때 자동으로 설정해주는 special column
   UpdateDataColumn : 업데이트 할때 따라 들어감
  */
  @CreateDateColumn()
  @Field((type) => Date)
  createadAt: Date;

  @UpdateDateColumn()
  @Field((type) => Date)
  updatedAt: Date;
}
