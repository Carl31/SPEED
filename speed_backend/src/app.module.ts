import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // to connect to db as soon as server starts
import { ConfigModule } from '@nestjs/config'; // for environment variables
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ArticlesModule } from './articles/articles.module';
import { AnalystArticlesModule } from './analystArticles/analystArticles.module';

@Module({
  // eslint-disable-next-line prettier/prettier
  imports: [ConfigModule.forRoot(), 
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@speed.kanud2m.mongodb.net/speed?retryWrites=true&w=majority`,
    ),
    UsersModule,
    ArticlesModule,
    AnalystArticlesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
