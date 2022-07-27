import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from 'src/jwt/jwt.service';
import { User } from './entities/user.entity';
import { UsersResolver } from './users.revolver';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtService], //ConfigService는 ConfigModule이 isGlobal : true 이기 때문에 그냥 안써도 된다.
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
