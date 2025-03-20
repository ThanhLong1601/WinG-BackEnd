import { UserModel } from './../models/user.model';
import { dataSource } from "../data-source";

export async function getUserByUid (uid: string) {
  const userRepository = dataSource.getRepository(UserModel);
  return userRepository.findOne({ where: { uid } });
};

export async function getUserByPhoneNumber (phone: string) {
  const userRepository = dataSource.getRepository(UserModel);
  return userRepository.findOne({ where: { phone } });
};

export async function saveUser (data: Partial<UserModel>): Promise<UserModel> {
  const userRepository = dataSource.getRepository(UserModel);
  const user =  userRepository.create(data);
  return userRepository.save(user);
};

export async function updateUser (user: UserModel, data: Partial<UserModel>) {
  const userRepository = dataSource.getRepository(UserModel);

  await userRepository.update(user.uid, data);
  return { ...user, ...data };
}

export async function updateUserPoint(uid: string, point: number) {
  const userRepository = dataSource.getRepository(UserModel);
  const user = await userRepository.findOne({ where: { uid } });

  user.point += point;
  await userRepository.save(user);
}