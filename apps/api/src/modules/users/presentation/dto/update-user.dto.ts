export class UpdateUserDto {
  firstName?: string;
  lastName?: string;
  roles?: string[];
  status?: 'Active' | 'Suspended';
}
