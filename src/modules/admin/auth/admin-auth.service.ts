import { toAdminDto } from "../../../dtos/admin.dto";
import { getAdmin, saveAdmin } from "../../../repositories/admin.repository";
import bcrypt from 'bcryptjs';
import { generateToken } from "../../../utils/jwtToken";

export async function createAdmin(body: any) {
  const { username, password, email, name } = body;

  const admin = await getAdmin(username, email);

  if (admin) {
    throw {
      message: 'Admin already exists',
      status: 400,
      data: null
    }
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newAdminn = await saveAdmin({ username, password: hashPassword, email, name });

  return toAdminDto(newAdminn);
}

export async function checkAdminLogin(body: any) {
  const { username, password } = body;
  const admin = await getAdmin(username);

  if (!admin) {
    throw {
      message: 'Username or password is not correct. Please try again!',
      status: 400,
      data: null
    };
  }

  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    throw {
      message: 'Username or password is not correct. Please try again!',
      status: 400,
      data: null
    };
  }

  const token = generateToken({ uid: admin.uid });

  return {data: toAdminDto(admin), token};
}