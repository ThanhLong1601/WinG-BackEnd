import { toUserDto } from "../../dtos/user.dto";
import { getUserByPhoneNumber, saveUser } from "../../repositories/user.repository";
import bcrypt from 'bcryptjs';
import { generateToken } from "../../utils/jwtToken";
import { AppError } from "../../utils/AppError";

export async function checkUserLogin(body: any) {
  const { pinCode, phone } = body;
  const user = await getUserByPhoneNumber(phone);

  if (!user) {
    throw new AppError({
      message: 'User not found',
      status: 404,
      data: null
    });
  }

  const isMatch = await bcrypt.compare(pinCode, user.pinCode);

  if (!isMatch) {
    throw new AppError({
      message: 'Password is incorrect',
      status: 400,
      data: null
    });
  }

  const token = generateToken({ uid: user.uid });

  return { user: toUserDto(user), token };
}

export async function createUser(body: any) {
  const { phone, pinCode, ...others } = body;

  const user = await getUserByPhoneNumber(phone);

  if (user) {
    throw new AppError({
      message: 'User already exists',
      status: 400,
      data: null
    });
  }

  const pinHash = await bcrypt.hash(pinCode, 10);

  const newUser = await saveUser({ ...others, pinCode: pinHash });

  return toUserDto(newUser);
}
