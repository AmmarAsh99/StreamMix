import { Module } from '@nestjs/common';
import { StreamModule } from './stream/stream.module';
import { HelloController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entites/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    StreamModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [User],
        synchronize: true,
        retryAttempts: 10,
        retryDelay: 3000,
      }),
    }),
    UserModule,
  ],
  controllers: [HelloController],
  providers: [],
})
export class AppModule {}
