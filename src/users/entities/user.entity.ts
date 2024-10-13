import { User } from '@prisma/client';

export class UserEntity implements User {
  id: string;
  email: string;
  uid: string;
  name: string;
  phoneNum: string;
  address: string;
  photo: string;
  role: string;
  createdAt: Date;
}
