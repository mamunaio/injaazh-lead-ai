import { TaskDocument } from '../../infrastructure/schemas/task.schema';

export interface ITaskRepository {
  create(task: Partial<TaskDocument>): Promise<TaskDocument>;
  findById(id: string): Promise<TaskDocument | null>;
  find(filter: Record<string, any>): Promise<TaskDocument[]>;
  update(id: string, task: Partial<TaskDocument>): Promise<TaskDocument | null>;
  delete(id: string): Promise<boolean>;
}

export const TASK_REPOSITORY = Symbol('TASK_REPOSITORY');
