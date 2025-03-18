import { toUserDto } from "../../../dtos/user.dto";
import { getUserByPhoneNumber, saveUser } from "../../../repositories/user.repository";
import bcrypt from 'bcryptjs';
import { generateToken } from "../../../utils/jwtToken";
import { UserModel } from "../../../models/user.model";
import { ApiError } from "../../../utils/apiError";
import { USER_STATUS } from "../../../constants/user.constants";

export async function checkUserLogin(body: any) {
  const { pinCode, phone } = body;
  const user = await getUserByPhoneNumber(phone);

  if (!user) {
    throw new ApiError ({
      message: 'Pin Code or Phone number is not correct. Please try again!',
      status: 400,
      data: null
    });
  }

  checkUserIsValid(user);

  const isMatch = await bcrypt.compare(pinCode, user.pinCode);

  if (!isMatch) {
    throw new ApiError ({
      message: 'Pin Code or Phone number is not correct. Please try again!',
      status: 400,
      data: null
    });
  }

  const token = generateToken({ uid: user.uid });

  return { user: toUserDto(user), token };
}

export async function createUser(body: any) { // add parameter acceptTimezone?: string to function if use timezone
  const { phone, pinCode, ...others } = body;

  const user = await getUserByPhoneNumber(phone);

  if (user) {
    if (user.status === USER_STATUS.SUSPENDED) {
      throw new ApiError({
        message: 'User is suspended',
        status: 403,
        data: null
      });
    }
    if (user.status === USER_STATUS.REQUESTING) {
      throw new ApiError({
        message: 'The account you have requested is our database. Please contact KKH liasion officer to retrieve your information',
        status: 403,
        data: null
      });
    }

    throw new ApiError ({
      message: 'User already exists',
      status: 400,
      data: null
    });
  }

  const pinHash = await bcrypt.hash(pinCode, 10);

  // const validTimezones = dayjs.tz.names(); // List of timezone from dayjs is valid
  // const userTimezone = validTimezones.includes(acceptTimezone as string) 
  //   ? acceptTimezone
  //   : 'UTC'; // Default timezone is UTC

  const newUser = await saveUser({ 
    ...others, 
    phone, 
    pinCode: pinHash, 
    status: USER_STATUS.ACTIVE, // for now set ACTIVE to testing, when create admin then set to REQUESTING
    // timezone: userTimezone
  });

  return toUserDto(newUser);
}

export function checkUserIsValid(user: UserModel) {
  if (!user) {
    throw new ApiError({
      message: 'User not found',
      status: 404,
      data: null
    });
  }

  if (user.status === USER_STATUS.SUSPENDED) {
    throw new ApiError({
      message: 'User is suspended',
      status: 403,
      data: null
    });
  }
  if (user.status === USER_STATUS.REQUESTING) {
    throw new ApiError({
      message: 'The account you have requested is our database. Please contact KKH liasion officer to retrieve your information',
      status: 403,
      data: null
    });
  }
}