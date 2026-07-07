import { Injectable, Inject, NotFoundException, Logger } from '@nestjs/common';
import { Types } from 'mongoose';
import { NOTE_REPOSITORY } from '../../domain/repositories/note.repository.interface';
import type { INoteRepository } from '../../domain/repositories/note.repository.interface';
import { NoteDocument } from '../../infrastructure/schemas/note.schema';

@Injectable()
export class NotesService {
  private readonly logger = new Logger(NotesService.name);

  constructor(
    @Inject(NOTE_REPOSITORY) private readonly noteRepo: INoteRepository,
  ) {}

  async createNote(
    organizationId: string,
    authorId: string,
    data: {
      content: string;
      leadId?: string;
      dealId?: string;
    },
  ) {
    this.logger.log(`Creating note for org ${organizationId}`);
    
    const { leadId, dealId, ...restData } = data;
    
    return this.noteRepo.create({
      ...restData,
      authorId: new Types.ObjectId(authorId),
      organizationId: new Types.ObjectId(organizationId),
      ...(leadId && { leadId: new Types.ObjectId(leadId) }),
      ...(dealId && { dealId: new Types.ObjectId(dealId) }),
    });
  }

  async getNotes(organizationId: string, filters: any = {}) {
    const query: any = { organizationId: new Types.ObjectId(organizationId) };
    
    if (filters.authorId) query.authorId = new Types.ObjectId(filters.authorId);
    if (filters.leadId) query.leadId = new Types.ObjectId(filters.leadId);
    if (filters.dealId) query.dealId = new Types.ObjectId(filters.dealId);

    return this.noteRepo.find(query);
  }

  async getNoteById(organizationId: string, noteId: string) {
    const note = await this.noteRepo.findById(noteId);
    if (!note || note.organizationId.toString() !== organizationId) {
      throw new NotFoundException('Note not found');
    }
    return note;
  }

  async updateNote(organizationId: string, noteId: string, data: Partial<NoteDocument>) {
    await this.getNoteById(organizationId, noteId); // Verify ownership
    
    // Ensure we don't accidentally update organizationId or authorId
    delete data.organizationId;
    delete data.authorId;
    
    return this.noteRepo.update(noteId, data);
  }

  async deleteNote(organizationId: string, noteId: string) {
    await this.getNoteById(organizationId, noteId); // Verify ownership
    return this.noteRepo.delete(noteId);
  }
}
