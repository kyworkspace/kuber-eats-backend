import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersResolver } from './users.revolver';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])], //ConfigService는 ConfigModule이 isGlobal : true 이기 때문에 그냥 안써도 된다.
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
