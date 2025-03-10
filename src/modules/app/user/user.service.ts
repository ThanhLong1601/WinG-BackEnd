import { toUserDto } from "../../../dtos/user.dto";
import { UserModel } from "../../../models/user.model";
import { getUserByUid, saveUser, updateUser } from "../../../repositories/user.repository";

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