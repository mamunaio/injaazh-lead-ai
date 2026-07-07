import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NoteDocument } from '../schemas/note.schema';
import { INoteRepository } from '../../domain/repositories/note.repository.interface';

@Injectable()
export class NoteRepository implements INoteRepository {
  constructor(
    @InjectModel(NoteDocument.name) private readonly noteModel: Model<NoteDocument>,
  ) {}

  async create(note: Partial<NoteDocument>): Promise<NoteDocument> {
    const newNote = new this.noteModel(note);
    return newNote.save();
  }

  async findById(id: string): Promise<NoteDocument | null> {
    return this.noteModel.findById(id).exec();
  }

  async find(filter: Record<string, any>): Promise<NoteDocument[]> {
    return this.noteModel.find(filter).sort({ createdAt: -1 }).exec();
  }

  async update(id: string, note: Partial<NoteDocument>): Promise<NoteDocument | null> {
    return this.noteModel.findByIdAndUpdate(id, note, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.noteModel.findByIdAndDelete(id).exec();
    return result !== null;
  }
}
