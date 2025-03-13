import { dataSource } from "../data-source";
import { UserSettingModel } from "../models/user_setting.model";

export async function getUserSettingByUid(uid: string) {
  const userSettingRepository = dataSource.getRepository(UserSettingModel);
  return userSettingRepository.findOne({ where: { uid } });
}

export async function saveUserSetting(data: Partial<UserSettingModel>): Promise<UserSettingModel> {
  const userSettingRepository = dataSource.getRepository(UserSettingModel);
  const userSetting =  userSettingRepository.create(data);
  return await userSettingRepository.save(userSetting);
}