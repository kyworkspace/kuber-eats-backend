import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

// type UserRole = 'client' | 'owner' | 'delivery';
enum UserRole {
  'Owner',
  'Client',
  'Deliverry',
}

//graphql에서 넘어온 녀석
registerEnumType(UserRole, { name: 'UserRole' });

@Entity()
@InputType({ isAbstract: true })
@ObjectType()
export class User extends CoreEntity {
  @Column()
  @Field((type) => String)
  email: string;

  @Column()
  @Field((type) => String)
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  @Field((type) => UserRole)
  role: UserRole;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
