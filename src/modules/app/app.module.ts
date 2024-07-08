import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import configurations from '../../configurations'
import { User } from '../users/models/user.model';
import { AuthModule } from '../auth/auth.module';
import { TokenModule } from '../token/token.module';

@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true,
        load: [configurations]
    }), 
    SequelizeModule.forRootAsync({
        imports: [ConfigModule], // Импорт конфига в pg
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({ // Работа с провайдером get
            dialect: "postgres", // БД
            host: configService.get('db_host'),
            port: configService.get('db_port'),
            username: configService.get('db_user'),
            password: configService.get('db_password'),
            name: configService.get('db_name'),
            synchronize: true, // Синхронизирует с бд
            autoLoadModels: true,
            models: [User]
    })
    }),
    UsersModule,
    AuthModule,
    TokenModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
