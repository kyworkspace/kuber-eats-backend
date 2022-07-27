import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersResolver } from './users.revolver';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])], //ConfigService는 ConfigModule이 isGlobal : true 이기 때문에 그냥 안써도 된다.
  providers: [UsersResolver, UsersService],
  exports: [UsersService], //다른곳에서 해당 서비스를 호출하는 경우에는 모듈에서 exports를 반드시 해줘야 한다.
})
export class UsersModule {}
