export class UpdateOrganizationDto {
  name?: string;
  domain?: string;
  status?: 'Active' | 'Suspended';
}
