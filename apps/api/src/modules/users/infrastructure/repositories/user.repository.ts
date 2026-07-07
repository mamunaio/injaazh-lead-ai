import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(UserDocument.name) private readonly userModel: Model<UserDocument>,
  ) {}

  private mapToEntity(doc: UserDocument): User {
    return new User(
      doc._id.toString(),
      doc.email,
      doc.passwordHash,
      doc.firstName,
      doc.lastName,
      doc.organizationId.toString(),
      doc.roles,
      doc.status as 'Active' | 'Suspended',
      (doc as any).createdAt,
      (doc as any).updatedAt,
    );
  }

  async create(user: Partial<User>): Promise<User> {
    const createdUser = new this.userModel({
      ...user,
      organizationId: new Types.ObjectId(user.organizationId),
    });
    const saved = await createdUser.save();
    return this.mapToEntity(saved);
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.userModel.findById(id).exec();
    if (!user) return null;
    return this.mapToEntity(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) return null;
    return this.mapToEntity(user);
  }

  async findByOrganization(organizationId: string): Promise<User[]> {
    const users = await this.userModel.find({ organizationId: new Types.ObjectId(organizationId) }).exec();
    return users.map(u => this.mapToEntity(u));
  }

  async update(id: string, user: Partial<User>): Promise<User | null> {
    const updated = await this.userModel
      .findByIdAndUpdate(id, user, { new: true })
      .exec();
    if (!updated) return null;
    return this.mapToEntity(updated);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    return result !== null;
  }
}
