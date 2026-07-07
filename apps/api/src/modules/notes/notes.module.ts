import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteDocument, NoteSchema } from './infrastructure/schemas/note.schema';
import { NOTE_REPOSITORY } from './domain/repositories/note.repository.interface';
import { NoteRepository } from './infrastructure/repositories/note.repository';
import { NotesService } from './application/services/notes.service';
import { TimelineService } from './application/services/timeline.service';
import { NotesController } from './presentation/notes.controller';
import { TimelineController } from './presentation/timeline.controller';
import { TasksModule } from '../tasks/tasks.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NoteDocument.name, schema: NoteSchema },
    ]),
    TasksModule, // Import TasksModule to access TasksService inside TimelineService
  ],
  controllers: [NotesController, TimelineController],
  providers: [
    {
      provide: NOTE_REPOSITORY,
      useClass: NoteRepository,
    },
    NotesService,
    TimelineService,
  ],
  exports: [NotesService, TimelineService],
})
export class NotesModule {}
