// types/index.ts
import { Timestamp } from 'firebase/firestore';

export interface Company {
  id: string;
  name: string;
  createdAt: Timestamp;
  adminUid: string;
  settings?: {
    allowMultipleInvites: boolean;
    inviteExpiration: number; // in hours
  };
}

export interface User {
  uid: string;
  email: string;
  companyId?: string;
  isAdmin: boolean;
  createdAt: Timestamp;
  displayName?: string;
  photoURL?: string;
}

export interface Invite {
  id: string;
  email: string;
  companyId: string;
  inviterUid: string;
  accepted: boolean;
  createdAt: Timestamp;
  expiresAt: Timestamp;
  role?: 'admin' | 'member';
}