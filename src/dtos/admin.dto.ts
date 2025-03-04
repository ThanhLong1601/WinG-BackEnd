import { AdminModel } from "../models/admin.model";

interface AdminDto {
  uid: string,
  username: string,
  name: string
};

export function toAdminDto(admin: AdminModel): AdminDto {
  return {
    uid: admin.uid,
    username: admin.username,
    name: admin.name
  };
} 