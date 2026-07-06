import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { ITagsRepository } from './repository/itags.repository';
import { TagsRepository } from './repository/tags.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TagsController],
  providers: [
    TagsService,
    {                                                                                                                 
      provide: ITagsRepository,                                                
      useClass: TagsRepository,                                       
    }
  ],
  exports: [TagsService],
})
export class TagsModule {}
