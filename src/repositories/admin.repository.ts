import { dataSource } from "../data-source";
import { AdminModel } from "../models/admin.model";

export async function getAdmin(username?: string, email?: string) {
  const adminRepository = dataSource.getRepository(AdminModel);

  if (!username && !email) return null;

  const admin = await adminRepository.findOne({
    where: {
      ...(username && { username }),
      ...(email && { email })
    }
  });

  return admin;
}

export async function getAdminByUid(uid: string) {
  const adminRepository = dataSource.getRepository(AdminModel);

  const admin = await adminRepository.findOne({ where: {uid} });

  return admin;
}

export async function saveAdmin(data: Partial<AdminModel>) {
  const adminRepository = dataSource.getRepository(AdminModel);

  const admin = await adminRepository.save(data);

  return admin;
}