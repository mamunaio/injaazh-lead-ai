export class CreateOrganizationDto {
  name!: string;
  domain?: string;
  // ownerId will be injected by the authenticated user's JWT payload
}
