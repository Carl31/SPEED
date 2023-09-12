import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // to connect to db as soon as server starts
import { ConfigModule } from '@nestjs/config'; // for environment variables
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  // eslint-disable-next-line prettier/prettier
  imports: [ConfigModule.forRoot(), 
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@speed.kanud2m.mongodb.net/`,
    ),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
