import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /*
   CreateDataColumn : entity를 만들었을때 자동으로 설정해주는 special column
   UpdateDataColumn : 업데이트 할때 따라 들어감
  */
  @CreateDateColumn()
  createadAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
