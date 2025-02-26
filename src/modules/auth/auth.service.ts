import { toUserDto } from "../../dtos/user.dto";
import { getUserByPhoneNumber, saveUser } from "../../repositories/user.repository";
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

export async function createUser (body: any) {
  const {phone, pinCode} = body;

  const user = await getUserByPhoneNumber(phone);

  if (user) {
    throw new Error('User already exists');
  }

  const pinHash = await bcrypt.hash(pinCode, 10);

  const newUser = await saveUser({...body, pinCode: pinHash});

  return toUserDto(newUser);
}
