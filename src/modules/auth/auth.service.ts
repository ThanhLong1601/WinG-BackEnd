import { toUserDto } from "../../dtos/user.dto";
import { getUserByPhoneNumber, saveUser } from "../../repositories/user.repository";
import bcrypt from 'bcryptjs';
import { generateToken } from "../../utils/jwtToken";

export async function checkUserLogin(body: any) {
  const { pinCode, phone } = body;
  const user = await getUserByPhoneNumber(phone);

  if (!user) {
    throw {
      message: 'Pin Code or Phone number is incorrect, Please try again!',
      status: 404,
      data: null
    };
  }

  const isMatch = await bcrypt.compare(pinCode, user.pinCode);

  if (!isMatch) {
    throw {
      message: 'Pin Code or Phone number is incorrect, Please try again!',
      status: 400,
      data: null
    };
  }

  const token = generateToken({ uid: user.uid });

  return { user: toUserDto(user), token };
}

export async function createUser(body: any) {
  const { phone, pinCode, ...others } = body;

  const user = await getUserByPhoneNumber(phone);

  if (user) {
    throw {
      message: 'User already exists',
      status: 400,
      data: null
    };
  }

  const pinHash = await bcrypt.hash(pinCode, 10);

  const newUser = await saveUser({ ...others, phone, pinCode: pinHash });

  return toUserDto(newUser);
}
