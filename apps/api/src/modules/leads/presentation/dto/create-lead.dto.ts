export class CreateLeadDto {
  firstName!: string;
  lastName?: string;
  email?: string;
  phone?: string;
  status?: 'New' | 'Contacted' | 'Qualified' | 'Lost' | 'Won';
  source?: string;
  assignedTo?: string;
}
