import { Doctor } from './doctor';
import { UserId } from './user';

export interface Patient {
  created_at: string;
  _id: string;
  name: string;
  gender: string;
  phone: string;
  age: number;
  doctor: Doctor;
  height: number;
  weight: number;
  peselNo: number;
  DOB: string;
  userId: UserId;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
