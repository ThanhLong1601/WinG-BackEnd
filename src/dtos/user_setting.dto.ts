import { UserSettingModel } from "../models/user_setting.model";

export interface UserSettingDto {
  usid: string;
  uid: string;
  chatbotUpdates: boolean;
  newEnrichUpdates: boolean;
  generalRemindersAndUpdates: boolean;
}

export function toUserSettingDto(userSetting: UserSettingModel) {
  if (!userSetting) return null;

  return {
    usid: userSetting.usid,
    uid: userSetting.uid,
    chatbotUpdates: userSetting.chatbotUpdates,
    newEnrichUpdates: userSetting.newEnrichUpdates,
    generalRemindersAndUpdates: userSetting.generalRemindersAndUpdates
  };
}