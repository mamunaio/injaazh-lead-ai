import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import type { ISequenceRepository } from '../../domain/repositories/sequence.repository.interface';
import { SEQUENCE_REPOSITORY } from '../../domain/repositories/sequence.repository.interface';
import { CreateSequenceDto, UpdateSequenceDto } from '../../presentation/dto/sequence.dto';
import { Sequence } from '../../domain/entities/sequence.entity';

@Injectable()
export class SequenceManagerService {
  constructor(
    @Inject(SEQUENCE_REPOSITORY) private readonly sequenceRepo: ISequenceRepository,
  ) {}

  async createSequence(organizationId: string, dto: CreateSequenceDto): Promise<Sequence> {
    this.validateSteps(dto.steps);
    return this.sequenceRepo.create(organizationId, dto as Partial<Sequence>);
  }

  async getSequences(organizationId: string): Promise<Sequence[]> {
    return this.sequenceRepo.findByOrganization(organizationId);
  }

  async getSequence(organizationId: string, id: string): Promise<Sequence> {
    const sequence = await this.sequenceRepo.findById(organizationId, id);
    if (!sequence) throw new NotFoundException('Sequence not found');
    return sequence;
  }

  async updateSequence(organizationId: string, id: string, dto: UpdateSequenceDto): Promise<Sequence> {
    const sequence = await this.sequenceRepo.findById(organizationId, id);
    if (!sequence) throw new NotFoundException('Sequence not found');
    
    if (dto.steps) {
      this.validateSteps(dto.steps);
    }
    
    const updated = await this.sequenceRepo.update(organizationId, id, dto as Partial<Sequence>);
    if (!updated) throw new Error('Failed to update sequence');
    return updated;
  }

  async deleteSequence(organizationId: string, id: string): Promise<{ deleted: true }> {
    const sequence = await this.sequenceRepo.findById(organizationId, id);
    if (!sequence) throw new NotFoundException('Sequence not found');

    await this.sequenceRepo.delete(organizationId, id);
    return { deleted: true };
  }

  private validateSteps(steps: any[]) {
    for (const step of steps) {
      if (step.type === 'WAIT' && (step.delayDays === undefined || step.delayDays <= 0)) {
        throw new BadRequestException('WAIT steps must include a delayDays greater than 0');
      }
      if (step.type === 'EMAIL' && !step.promptTemplateId) {
        throw new BadRequestException('EMAIL steps must include a promptTemplateId');
      }
    }
  }
}
