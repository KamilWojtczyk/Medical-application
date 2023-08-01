export interface User {
  created_at: string;
  _id: string;
  name: string;
  gender: string;
  phone: string;
  userId: UserId;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UserId {
  role: string;
  isEmailVerified: boolean;
  created_at: string;
  _id: string;
  name: string;
  email: string;
  password: string;
  gender: string;
  phone: string;
  verifyToken: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
