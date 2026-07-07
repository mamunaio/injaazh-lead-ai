import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MailAccount } from '../../domain/entities/mail-account.entity';
import { IMailAccountRepository } from '../../domain/repositories/mail-account.repository.interface';
import { MailAccountDocument } from '../schemas/mail-account.schema';

@Injectable()
export class MailAccountRepository implements IMailAccountRepository {
  constructor(
    @InjectModel(MailAccountDocument.name) private readonly mailAccountModel: Model<MailAccountDocument>,
  ) {}

  private mapToEntity(doc: MailAccountDocument): MailAccount {
    return new MailAccount(
      doc._id.toString(),
      doc.organizationId.toString(),
      doc.provider as any,
      doc.credentials,
      doc.isDefault,
      doc.fromEmail,
      doc.fromName,
      (doc as any).createdAt,
      (doc as any).updatedAt,
    );
  }

  async create(organizationId: string, account: Partial<MailAccount>): Promise<MailAccount> {
    const created = new this.mailAccountModel({
      ...account,
      organizationId: new Types.ObjectId(organizationId),
    });
    const saved = await created.save();
    return this.mapToEntity(saved);
  }

  async findById(organizationId: string, id: string): Promise<MailAccount | null> {
    const doc = await this.mailAccountModel.findOne({
      _id: new Types.ObjectId(id),
      organizationId: new Types.ObjectId(organizationId),
    }).exec();
    return doc ? this.mapToEntity(doc) : null;
  }

  async findByOrganization(organizationId: string): Promise<MailAccount[]> {
    const docs = await this.mailAccountModel.find({
      organizationId: new Types.ObjectId(organizationId),
    }).exec();
    return docs.map(d => this.mapToEntity(d));
  }

  async getDefault(organizationId: string): Promise<MailAccount | null> {
    const doc = await this.mailAccountModel.findOne({
      organizationId: new Types.ObjectId(organizationId),
      isDefault: true,
    }).exec();
    return doc ? this.mapToEntity(doc) : null;
  }

  async setDefault(organizationId: string, id: string): Promise<void> {
    // Unset current default
    await this.mailAccountModel.updateMany(
      { organizationId: new Types.ObjectId(organizationId) },
      { $set: { isDefault: false } }
    ).exec();

    // Set new default
    await this.mailAccountModel.updateOne(
      { _id: new Types.ObjectId(id), organizationId: new Types.ObjectId(organizationId) },
      { $set: { isDefault: true } }
    ).exec();
  }

  async update(organizationId: string, id: string, data: Partial<MailAccount>): Promise<MailAccount | null> {
    const updated = await this.mailAccountModel.findOneAndUpdate(
      { _id: new Types.ObjectId(id), organizationId: new Types.ObjectId(organizationId) },
      { $set: data },
      { returnDocument: 'after' }
    ).exec();
    return updated ? this.mapToEntity(updated) : null;
  }
}
