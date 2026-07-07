import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PromptTemplate } from '../../domain/entities/prompt-template.entity';
import { IPromptTemplateRepository } from '../../domain/repositories/prompt-template.repository.interface';
import { PromptTemplateType } from '../../domain/enums/prompt-template-type.enum';
import { PromptTemplateDocument, PromptTemplate as PromptTemplateSchemaClass } from '../schemas/prompt-template.schema';
import { PromptTemplateMapper } from './prompt-template.mapper';

@Injectable()
export class PromptTemplateRepository implements IPromptTemplateRepository {
  constructor(
    @InjectModel(PromptTemplateSchemaClass.name)
    private readonly model: Model<PromptTemplateDocument>,
  ) {}

  async create(template: PromptTemplate): Promise<PromptTemplate> {
    const created = new this.model({
      name: template.name,
      type: template.type,
      content: template.content,
      variables: template.variables,
      organizationId: new Types.ObjectId(template.organizationId),
      isActive: template.isActive,
    });
    
    const saved = await created.save();
    return PromptTemplateMapper.toDomain(saved);
  }

  async findById(id: string): Promise<PromptTemplate | null> {
    const raw = await this.model.findById(id).exec();
    if (!raw) return null;
    return PromptTemplateMapper.toDomain(raw);
  }

  async findByOrganizationId(organizationId: string): Promise<PromptTemplate[]> {
    const docs = await this.model.find({ organizationId: organizationId as any }).exec();
    return docs.map(PromptTemplateMapper.toDomain);
  }

  async findByType(organizationId: string, type: PromptTemplateType): Promise<PromptTemplate[]> {
    const docs = await this.model.find({ 
      organizationId: organizationId as any,
      type 
    }).exec();
    return docs.map(PromptTemplateMapper.toDomain);
  }

  async update(template: PromptTemplate): Promise<PromptTemplate> {
    const updated = await this.model.findByIdAndUpdate(
      template.id,
      {
        $set: {
          name: template.name,
          content: template.content,
          variables: template.variables,
          isActive: template.isActive,
        },
      },
      { new: true },
    ).exec();
    
    if (!updated) {
      throw new Error(`PromptTemplate with id ${template.id} not found`);
    }
    
    return PromptTemplateMapper.toDomain(updated);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return !!result;
  }
}
