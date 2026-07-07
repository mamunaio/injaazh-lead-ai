import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ScrapeJob } from '../../domain/entities/scrape-job.entity';
import { IScrapeJobRepository } from '../../domain/repositories/scrape-job.repository.interface';
import { ScrapeJobDocument } from '../schemas/scrape-job.schema';

@Injectable()
export class ScrapeJobRepository implements IScrapeJobRepository {
  constructor(
    @InjectModel(ScrapeJobDocument.name) private readonly jobModel: Model<ScrapeJobDocument>,
  ) {}

  private mapToEntity(doc: ScrapeJobDocument): ScrapeJob {
    return new ScrapeJob(
      doc._id.toString(),
      doc.organizationId.toString(),
      doc.type as any,
      doc.status as any,
      doc.parameters,
      doc.progress,
      doc.resultCount,
      doc.error,
      (doc as any).createdAt,
      (doc as any).updatedAt,
    );
  }

  async create(organizationId: string, job: Partial<ScrapeJob>): Promise<ScrapeJob> {
    const createdJob = new this.jobModel({
      ...job,
      organizationId: new Types.ObjectId(organizationId),
    });
    const saved = await createdJob.save();
    return this.mapToEntity(saved);
  }

  async findById(organizationId: string, id: string): Promise<ScrapeJob | null> {
    const job = await this.jobModel.findOne({
      _id: new Types.ObjectId(id),
      organizationId: new Types.ObjectId(organizationId),
    }).exec();
    if (!job) return null;
    return this.mapToEntity(job);
  }

  async findByOrganization(organizationId: string): Promise<ScrapeJob[]> {
    const jobs = await this.jobModel.find({
      organizationId: new Types.ObjectId(organizationId),
    }).sort({ createdAt: -1 }).exec();
    return jobs.map(j => this.mapToEntity(j));
  }

  async update(organizationId: string, id: string, job: Partial<ScrapeJob>): Promise<ScrapeJob | null> {
    const updated = await this.jobModel
      .findOneAndUpdate(
        { _id: new Types.ObjectId(id), organizationId: new Types.ObjectId(organizationId) },
        job as any,
        { new: true }
      )
      .exec();
    if (!updated) return null;
    return this.mapToEntity(updated);
  }

  async updateStatus(id: string, status: ScrapeJob['status'], progress?: number, resultCount?: number, error?: string): Promise<void> {
    const updatePayload: any = { status };
    if (progress !== undefined) updatePayload.progress = progress;
    if (resultCount !== undefined) updatePayload.resultCount = resultCount;
    if (error !== undefined) updatePayload.error = error;

    await this.jobModel.updateOne({ _id: new Types.ObjectId(id) }, updatePayload).exec();
  }
}
