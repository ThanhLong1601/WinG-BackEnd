import { toUserDto } from "../../../dtos/user.dto";
import { toUserSettingDto } from "../../../dtos/user_setting.dto";
import { UserModel } from "../../../models/user.model";
import { getUserByUid, saveUser, updateUser } from "../../../repositories/user.repository";
import { getUserSettingByUid, saveUserSetting } from "../../../repositories/user_setting.repository";
import { ApiError } from "../../../utils/apiError";

export async function updateUserProfile(uid: string, body: any) {
  const user = await getUserByUid(uid);

  const { hasPregnancies, vaginalDeliveries, caesareanSections, miscarriages, ...others} = body;


  let updated: Partial<UserModel> = {hasPregnancies, ...others};

  if (hasPregnancies) {
    updated.vaginalDeliveries = vaginalDeliveries;
    updated.caesareanSections = caesareanSections;
    updated.miscarriages = miscarriages;
  } else {
    updated.vaginalDeliveries = 0;
    updated.caesareanSections = 0;
    updated.miscarriages = 0;
  }

  updated.needUpdateProfile = false;

  const dataUser = await updateUser(user, updated);

  return toUserDto(dataUser);
}

export async function userSettingUpdated(uid: string, body: any) {
  let userSetting = await getUserSettingByUid(uid);

  if (userSetting) {
    userSetting = { ...userSetting, ...body };
  } else {
    userSetting = { uid, ...body };
  }

  const dataUserSetting = await saveUserSetting(userSetting);

  return toUserSettingDto(dataUserSetting);
}

export async function updatedUserTimezone(uid: string, body: any) {
  const user = await getUserByUid(uid);

  if (body.timezone < -12 || body.timezone > 14) {
    throw new ApiError({ message: 'Invalid timezone. Must be between -12 and 14.', status: 400, data: null });
  }

  const updated: Partial<UserModel> = { timezone: body.timezone };

  const dataUser = await updateUser(user, updated);

  return toUserDto(dataUser);
}