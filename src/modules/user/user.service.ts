import { toUserDto } from "../../dtos/user.dto";
import { UserModel } from "../../models/user.model";
import { getUserByUid, saveUser, updateUser } from "../../repositories/user.repository";
import { AppError } from "../../utils/AppError";

export async function updateUserProfile(uid: string, body: any) {
  const user = await getUserByUid(uid);

  if (!user) {
    throw new AppError({
      message: 'User not found',
      status: 404,
      data: null
    });
  }

  const { hasPregnancies, vaginalDeliveries, caesareanSections, miscarriages, ...others} = body;


  let updated: Partial<UserModel> = {hasPregnancies, ...others};

  if (hasPregnancies) {
    updated.vaginalDeliveries = vaginalDeliveries;
    updated.caesareanSections = caesareanSections;
    updated.miscarriages = miscarriages;

    updated.needUpdateProfile = false;
  } else {
    updated.vaginalDeliveries = 0;
    updated.caesareanSections = 0;
    updated.miscarriages = 0;
  }

  updated.needUpdateProfile = false;

  const dataUser = await updateUser(user, updated);

  return toUserDto(dataUser);
}