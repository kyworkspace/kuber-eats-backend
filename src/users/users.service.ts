import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { JwtService } from 'src/jwt/jwt.service';
import { EditProfileInput } from './dtos/edit-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly confg: ConfigService, // dependancy injection -  유저 모듈에서 컨피그 서비스를 임포트하였기 때문에 사용가능
    private readonly JwtService: JwtService,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<{ ok: boolean; error?: string }> {
    // check new User

    try {
      const exists = await this.users.findOne({ where: { email } });

      if (exists) {
        //make error . dup Id
        return { ok: false, error: '해당 이메일을 가진 사용자가 존재합니다.' };
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
        return { ok: true };
      }
    } catch (error) {
      //return
      return { ok: false, error: '계정을 생성할 수 없습니다.' };
    }
  }

  async login({
    email,
    password,
  }: LoginInput): Promise<{ ok: boolean; error?: string; token?: string }> {
    //check if the passwork is correct

    // make jwt

    try {
      const user = await this.users.findOne({ where: { email } });

      if (!user) {
        // find user email
        return {
          ok: false,
          error: '회원을 찾지 못했습니다.',
        };
      }
      const passwordCrorrect = await user.checkPassword(password);
      if (!passwordCrorrect) {
        return {
          ok: false,
          error: '비밀번호가 틀렸습니다.',
        };
      }
      const token = this.JwtService.sign(user.id);
      return {
        ok: true,
        token: token,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async findById(id: number): Promise<User> {
    return this.users.findOne({ where: { id } });
  }

  async editProfile(userId: number, { email, password }: EditProfileInput) {
    //로그인 해야 사용할수느 있는 로직이기 때문에 update 사용해도 가능
    //{id : userId} 해도됨
    // 단순히 업데이트만 하기 때문에 beforeUpdate를 타지 못함 update => save 사용

    const user = await this.users.findOne({ where: { id: userId } });
    if (email) {
      user.email = email;
    }
    if (password) {
      user.password = password;
    }
    return this.users.save(user);
  }
}
