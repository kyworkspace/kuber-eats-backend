import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-account.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<string | undefined> {
    // check new User

    try {
      const exists = await this.users.findOne({ where: { email } });

      if (exists) {
        //make error . dup Id
        return '해당 이메일을 가진 사용자가 존재합니다.';
      } else {
        //create user  & hash the password
        await this.users.save(
          this.users.create({
            email,
            password,
            role,
          }),
        );
        //success create account
      }
    } catch (error) {
      //return
      return '계정을 생성할 수 없습니다.';
    }
  }
}
