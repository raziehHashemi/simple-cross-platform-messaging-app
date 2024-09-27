import { User } from 'src/entities/user.entity';

export interface IUserSearchResponse {
  status: number;
  message: string;
  user: User | null;
}