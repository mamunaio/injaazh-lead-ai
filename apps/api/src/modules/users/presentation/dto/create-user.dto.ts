export class CreateUserDto {
  email!: string;
  password!: string;
  firstName!: string;
  lastName!: string;
  organizationId!: string;
  roles?: string[];
}
