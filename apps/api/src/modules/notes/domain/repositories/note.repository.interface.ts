import { NoteDocument } from '../../infrastructure/schemas/note.schema';

export interface INoteRepository {
  create(note: Partial<NoteDocument>): Promise<NoteDocument>;
  findById(id: string): Promise<NoteDocument | null>;
  find(filter: Record<string, any>): Promise<NoteDocument[]>;
  update(id: string, note: Partial<NoteDocument>): Promise<NoteDocument | null>;
  delete(id: string): Promise<boolean>;
}

export const NOTE_REPOSITORY = Symbol('NOTE_REPOSITORY');
