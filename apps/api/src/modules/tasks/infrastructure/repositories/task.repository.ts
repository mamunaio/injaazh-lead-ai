import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskDocument } from '../schemas/task.schema';
import { ITaskRepository } from '../../domain/repositories/task.repository.interface';

@Injectable()
export class TaskRepository implements ITaskRepository {
  constructor(
    @InjectModel(TaskDocument.name) private readonly taskModel: Model<TaskDocument>,
  ) {}

  async create(task: Partial<TaskDocument>): Promise<TaskDocument> {
    const newTask = new this.taskModel(task);
    return newTask.save();
  }

  async findById(id: string): Promise<TaskDocument | null> {
    return this.taskModel.findById(id).exec();
  }

  async find(filter: Record<string, any>): Promise<TaskDocument[]> {
    return this.taskModel.find(filter).sort({ dueDate: 1 }).exec();
  }

  async update(id: string, task: Partial<TaskDocument>): Promise<TaskDocument | null> {
    return this.taskModel.findByIdAndUpdate(id, task, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.taskModel.findByIdAndDelete(id).exec();
    return result !== null;
  }
}
