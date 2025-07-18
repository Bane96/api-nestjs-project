import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import TypeormConfig from './config/typeorm.config';
import {HomeModule} from "./home/home.module";
import { AuthModule } from './auth/auth.module';
import {AdminModule} from "./admin/admin.module";
import {PhotoModule} from './gallery/photo.module';

@Module({
  imports: [UserModule, HomeModule, AuthModule, AdminModule, PhotoModule, TypeOrmModule.forRoot(TypeormConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
