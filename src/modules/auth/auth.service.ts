import { toUserDto } from "../../dtos/user.dto";
import { getUserByPhoneNumber } from "../../repositories/user.repository";
import bcrypt from 'bcryptjs';

export async function checkUserLogin (body: any) {
  const {pinCode, phone} = body;
  const user = await getUserByPhoneNumber(phone);

  if (!user) {
    throw new Error('User not found');
  }

  const isMatch = await bcrypt.compare(pinCode, user.pinCode);

  if (!isMatch) {
    throw new Error('Invalid pin code');
  }

  return toUserDto(user);
}
