import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnalystArticlesController } from './analystArticles.controller';
import { AnalystArticlesService } from './analystArticles.service';
import { AnalystArticleSchema } from './analystArticles.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'AnalystArticle', schema: AnalystArticleSchema },
    ]),
  ],
  controllers: [AnalystArticlesController],
  providers: [AnalystArticlesService],
})
export class AnalystArticlesModule {}
