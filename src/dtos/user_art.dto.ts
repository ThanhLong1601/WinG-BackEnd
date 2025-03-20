import { UserSubmisArtModel } from "../models/user_submis_art.model";

interface UserArtDTO {
  uaid: string;
  aid: string;
  uid: string;
  submissionDate: Date;
  pointsEarned: number;
  submittedArtWork: string;
  userThoughts: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export function toUserArtDTO(userArt: UserSubmisArtModel): UserArtDTO {
  return {
    uaid: userArt.uaid,
    aid: userArt.aid,
    uid: userArt.uid,
    submissionDate: userArt.submissionDate,
    pointsEarned: userArt.pointsEarned,
    submittedArtWork: userArt.submittedArtWork,
    userThoughts: userArt.userThoughts,
    status: userArt.status,
    createdAt: userArt.createdAt,
    updatedAt: userArt.updatedAt
  };
}

export function toListUserArtDTO(userArts: UserSubmisArtModel[]): UserArtDTO[] {
  if (!userArts) return [];
  
  return userArts.map(userArt => toUserArtDTO(userArt));
}

export function toListUserArtForAdminDTO(userArt: UserSubmisArtModel[]) {
  if (!userArt) return [];

  return userArt.map(userArt => ({
    uaid: userArt.uaid,
    aid: userArt.aid,
    uid: userArt.uid,
    userName: userArt.user?.name,
    submissionDate: userArt.submissionDate,
    pointsEarned: userArt.pointsEarned,
    userThoughts: userArt.userThoughts ? "YES" : "NO",
  }));
}

export function toUserArtForAdminDTO(userArt: UserSubmisArtModel) {

  return {
    uaid: userArt.uaid,
    topicName: userArt.artJournal?.name,
    userName: userArt.user?.name,
    submissionDate: userArt.submissionDate,
    pointsEarned: userArt.pointsEarned,
    submittedArtWork: userArt.submittedArtWork,
    userThoughts: userArt.userThoughts,
  };
}