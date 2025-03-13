import status from "http-status";
import { UserModel } from "../models/user.model";

interface UserDto {
  uid: string;
  phone: string;
  isKkhPatient: boolean;
  avatar: string;
  name: string;
  email: string;
  dateOfBirth: Date;
  ethnicity : string;
  currentOccupation: string;
  highestAttainedEducation: string;
  hasPregnancies: boolean;
  vaginalDeliveries: number;
  caesareanSections: number;
  miscarriages: number;
  status: string;
}

export function toUserDto(user: UserModel) {
  return {
    uid: user.uid,
    phone: user.phone,
    isKkhPatient: user.isKkhPatient,
    avatar: user.avatar,
    name: user.name,
    email: user.email,
    dateOfBirth: user.dateOfBirth,
    ethnicity: user.ethnicity,
    currentOccupation: user.currentOccupation,
    highestAttainedEducation: user.highestAttainedEducation,
    hasPregnancies: user.hasPregnancies,
    vaginalDeliveries: user.vaginalDeliveries,
    caesareanSections: user.caesareanSections,
    miscarriages: user.miscarriages,
    needUpdateProfile: user.needUpdateProfile,
    status: user.status,
  };
}